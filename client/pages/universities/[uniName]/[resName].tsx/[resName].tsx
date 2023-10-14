import { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, withRouter, NextRouter } from "next/router";
import ResidenceDescription from "@/components/residences/residenceDescription";

type ResState = {
  uniName: string | string[];
  resName: string | string[];
  residenceInfo: any;
};

type ResProps = {
  router: NextRouter;
};

class ResInfo extends Component<ResProps, ResState> {
  api: any;

  constructor(props: any) {
    super(props);
    this.state = {
      uniName: "",
      resName: "",
      residenceInfo: null,
    };
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    const {router} = this.props
    const { uniName, resName } = router.query;
    const storeUniName = Array.isArray(uniName) ? uniName[0] : uniName;
    const storeResName = Array.isArray(resName) ? resName[0] : resName;
    if (storeUniName && storeResName) {
      this.setState({ uniName: storeUniName, resName: storeResName });
      Cookies.set("uniName", storeUniName);
      Cookies.set("resName", storeResName);
    } else {
      const storedUniName = Cookies.get("uniName");
      const storedResName = Cookies.get("resName");

      if (storedUniName && storedResName) {
        this.setState({ uniName: storedUniName, resName: storedResName });
      }
    }

    try {
      const uniName = Cookies.get("uniName");
      const resName = Cookies.get("resName");
      const response = await this.api.get(`api/get_residence_info/${uniName}/${resName}`);
      const residenceInfo = response.data.residenceInfo;
      this.setState({ residenceInfo });
    } catch (e) {
      console.log("failed to retrieve residence info");
    }
  }

  render() {
    const {resName, residenceInfo } = this.state;
    return (
      <div className="p-5">
        <div className="flex justify-center md:mb-20">
          <h1 className="text-customDefault text-3xl font-bold">{resName}</h1>
        </div>
        <div className="flex flex-row">
          <div className="w-3/5"></div>
          <div className="w-2/5">

            {residenceInfo ? (<ResidenceDescription
              residence={resName}
              pricing={residenceInfo.price}
              style={residenceInfo.style}
              rating={residenceInfo.rating}
            />) : (<></>)}
            
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResInfo);
