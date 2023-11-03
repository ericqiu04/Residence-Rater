import { Component } from "react";
import { withRouter, NextRouter } from "next/router";

import ResidenceImages from "@/components/residences/residenceImages";
import ResidenceDescription from "@/components/residences/residenceDescription";

import api from "@/auth/api";
import { ResState } from "@/data/state";
import { RouterProps } from "@/data/props";

class ResInfo extends Component<RouterProps, ResState> {
  constructor(props: any) {
    super(props);
    this.state = {
      uniName: "",
      resName: "",
      residenceInfo: null,
    };
  
  }

  async fetchData() {
    const { router } = this.props;
    const { uniName, resName } = router.query;

    if (uniName && resName) {
      try {
        const response = await api.get(
          `get_residence_info/${uniName}/${resName}`
        );
        console.log(response);
        const residenceInfo = response.data.residenceInfo;
        this.setState({ uniName, resName, residenceInfo });
      } catch (e) {

      }
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: RouterProps) {
    if (prevProps.router.query.uniName !== this.props.router.query.uniName || prevProps.router.query.resName !== this.props.router.query.resName) {
      this.fetchData();
    }
  }

  render() {
    const { resName, residenceInfo } = this.state;
    // @ts-ignore
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
