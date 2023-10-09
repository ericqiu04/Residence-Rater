import React from "react";
import { withRouter, NextRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import ResProp from "@/components/resProp";

type State = {
  uniName: string;
  residences: any[];
};

type Props = {
  router: NextRouter;
};
class Residences extends React.Component<Props, State> {
  api: any;
  constructor(props: any) {
    super(props);
    this.state = {
      uniName: "",
      residences: [],
    };
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    const { router } = this.props;
    const { uniName } = router.query;
    const storeUniName = Array.isArray(uniName) ? uniName[0] : uniName;
    if (storeUniName) {
      this.setState({uniName: storeUniName});
      Cookies.set("uniName", storeUniName);
    } else {
      const storedUniName = Cookies.get('uniName');

      if (storedUniName) {
        this.setState({ uniName: storedUniName});
      }
    }
    try {
      const uniName = Cookies.get("uniName");
      const response = await this.api.get(`api/get_residences/${uniName}/`);
      const residences = response.data.residences;
      this.setState({ residences: residences });
    } catch (e) {
      console.log("failed");
    }
  }

  render() {
    const { uniName, residences } = this.state;
    return (
      <div className="">
        <h1 className="text-center text-4xl font-bold">{uniName} Residences</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mx-auto fadeLonger w-4/5 p-16">
          {residences.map((res, index) => (
            <ResProp
              key={index}
              resName={res.resName}
              resImageLink={res.imageLink}
              rating={res.rating}
              uniName = {uniName}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Residences);
