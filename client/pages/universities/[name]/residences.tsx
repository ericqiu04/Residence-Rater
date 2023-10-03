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
    const { name } = this.props.router.query;
    if (name) {
      const decodedName =
        typeof name === "string" ? decodeURIComponent(name) : "";
      this.setState({ uniName: decodedName });

      Cookies.set("uniName", decodedName);
    } else {
      const storedUniName = Cookies.get("uniName");
      if (storedUniName) {
        this.setState({ uniName: storedUniName });
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
      <div className = "flex justify-center">
        <h1 className="text-4xl font-bold">{uniName} Residences</h1>
        {residences.map((res, index) => (
          <ResProp/>
        ))}
      </div>
    );
  }
}

export default withRouter(Residences);
