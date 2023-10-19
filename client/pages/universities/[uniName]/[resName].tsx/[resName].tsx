import { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { withRouter, NextRouter } from "next/router";

import ResidenceImages from "@/components/residences/residenceImages";
import ResidenceDescription from "@/components/residences/residenceDescription";

type ResState = {
  uniName: string | string[] | undefined;
  resName: string | string[] | undefined;
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
    const { router } = this.props;
    const { uniName, resName } = router.query;
    this.setState({uniName, resName})
    console.log(uniName, resName)
    const storeUniName = Array.isArray(uniName) ? uniName[0] : uniName;
    const storeResName = Array.isArray(resName) ? resName[0] : resName;
    if (storeUniName && storeResName) {
      this.setState({ uniName: storeUniName, resName: storeResName });
      Cookies.set("uName", storeUniName);
      Cookies.set("rName", storeResName);
    } else {
      const storedUniName = Cookies.get("uName");
      const storedResName = Cookies.get("rName");

      if (storedUniName && storedResName) {
        this.setState({ uniName: storedUniName, resName: storedResName });
      }
    }

    try {
      const uniName = Cookies.get("uName");
      const resName = Cookies.get("rName");
      const response = await this.api.get(
        `api/get_residence_info/${uniName}/${resName}`
      );
      console.log(response)
      const residenceInfo = response.data.residenceInfo;
      this.setState({ residenceInfo });
    } catch (e) {
      console.log("failed to retrieve residence info");
    }
  }

  render() {
    const { resName, residenceInfo } = this.state;
    return (
      <div className="p-5">
        <div className="flex justify-center md:mb-20">
          <h1 className="text-customDefault text-3xl font-bold">{resName}</h1>
        </div>
        <div className="flex flex-row">
          <div className="w-3/5">
            {residenceInfo ? (
              <div>
                <ResidenceImages images={residenceInfo.images} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-2/5">
            {residenceInfo ? (
              <ResidenceDescription
                residence={resName}
                pricing={residenceInfo.price}
                style={residenceInfo.style}
                rating={residenceInfo.rating}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResInfo);
