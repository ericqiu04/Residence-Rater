import { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, withRouter, NextRouter } from "next/router";

type ResState = {
  uniName: string | string[];
  resName: string | string[];
  residenceInfo: any[];
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
      residenceInfo: [],
    };
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    const { router } = this.props;
    const { uniName, resName } = router.query;

    const storeUniName = Array.isArray(uniName) ? uniName[0] : uniName;
    const storeResName = Array.isArray(resName) ? resName[0] : resName;
    if (storeUniName && storeResName) {
      this.setState({ uniName: storeUniName, resName: storeResName });
      Cookies.set("uniName", storeUniName);
      Cookies.set("resName", storeResName);
    } else {
      const storedUniName = Cookies.get('uniName');
      const storedResName = Cookies.get('resName')

      if (storedUniName && storedResName) {
        this.setState({ uniName: storedUniName, resName: storedResName });
      }
    }
    
    try {
      const uniName = Cookies.get('uniName')
      const resName = Cookies.get('resName')
      console.log(uniName)
      console.log(resName)
      const response = await this.api.get(`api/get_residence_info/${uniName}/${resName}`);
      const residenceInfo = response.data.residenceInfo
      this.setState({residenceInfo})
      console.log({residenceInfo})
      console.log('success')
    }
    catch(e) {
      console.log('failed to retrieve residence info')
    }
  }

  render() {
    const { uniName, resName } = this.state;
    return (
      <div className="">
        <h1 className="text-xl">{uniName}</h1>
        <h2 className="text-lg">{resName}</h2>
      </div>
    );
  }
}

export default withRouter(ResInfo);
