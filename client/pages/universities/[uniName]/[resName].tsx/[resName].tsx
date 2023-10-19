import { Component } from "react";
import axios from "axios";
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

  async fetchData() {
    const { router } = this.props;
    const { uniName, resName } = router.query;

    if (uniName && resName) {
      try {
        const response = await this.api.get(
          `api/get_residence_info/${uniName}/${resName}`
        );
        console.log(response);
        const residenceInfo = response.data.residenceInfo;
        this.setState({ uniName, resName, residenceInfo });
      } catch (e) {
        console.log("failed to retrieve residence info");
      }
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: ResProps) {
    if (prevProps.router.query.uniName !== this.props.router.query.uniName || prevProps.router.query.resName !== this.props.router.query.resName) {
      this.fetchData();
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
