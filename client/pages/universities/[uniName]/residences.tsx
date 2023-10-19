import React from "react";
import { withRouter, NextRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import ResProp from "@/components/residences/resProp";

type State = {
  uniName: string | string[];
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

  async fetchData(uniName:any) {
    try {
      const response = await this.api.get(`api/get_residences/${uniName}`);
      console.log(response);
      const residences = response.data.residences;
      this.setState({ uniName, residences });
    } catch (e) {
      console.log("failed");
    }
  }

  componentDidMount() {
    const storedUniName = localStorage.getItem("uniName");
    const uniName = JSON.parse(storedUniName)
    if (uniName) {
      this.setState({ uniName });
    }

    this.fetchData(uniName);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.router.query.uniName !== this.props.router.query.uniName) {
      const { uniName } = this.props.router.query;
      if (uniName) {
        this.fetchData(uniName);
      }
    }
  }

  render() {
    const { uniName, residences } = this.state;
    console.log(residences)
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
