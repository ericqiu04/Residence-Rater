import { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, withRouter, NextRouter } from "next/router";

type ResState = {
  uniName: string | string[];
  resName: string | string[];
  residencesInfo: any[];
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
      residencesInfo: [],
    };
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    const { router } = this.props;
    const { uni, res } = router.query;

    const uniName = Array.isArray(uni) ? uni[0] : uni;
    const resName = Array.isArray(res) ? res[0] : res;
    if (uniName && resName) {
      this.setState({ uniName, resName });
      Cookies.set("uniName", uniName);
      Cookies.set("resName", resName);
    } else {
      const storedUniName = Cookies.get('uniName');
      const storedResName = Cookies.get('resName')

      if (storedUniName && storedResName) {
        this.setState({ uniName: storedUniName, resName: storedResName });
      }
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
