import { Component } from "react";
import { withRouter, NextRouter } from "next/router";

import ResidenceImages from "@/components/residences/residenceImages";
import ResidenceDescription from "@/components/residences/residenceDescription";
import ResidenceRating from "@/components/residences/residenceRating";

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
        const residenceInfo = response.data.residenceInfo;
        //@ts-ignore
        this.setState({ uniName, resName, residenceInfo });
      } catch (e) {}
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: RouterProps) {
    if (
      prevProps.router.query.uniName !== this.props.router.query.uniName ||
      prevProps.router.query.resName !== this.props.router.query.resName
    ) {
      this.fetchData();
    }
  }

  render() {
    const { uniName, resName, residenceInfo } = this.state;
    // @ts-ignore
    return (
      <div className="p-5">
        <div className="flex justify-center md:mb-20">
          <h1 className="text-customDefault text-3xl font-bold">{resName}</h1>
        </div>
        <div className="flex md:flex-row flex-col mt-10">
          <div className="w-full md:w-3/5">
            {residenceInfo ? (
              <div>
                <ResidenceImages images={residenceInfo.images} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full md:w-2/5">
            {residenceInfo ? (
              <ResidenceDescription
                residence={resName}
                pricing={residenceInfo.price}
                style={residenceInfo.style}
                rating={residenceInfo.rating}
                resName={resName}
                uniName={uniName}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full flex flex-wrap">
          <ResidenceRating uniName={uniName} resName={resName} />
        </div>
      </div>
    );
  }
}

export default withRouter(ResInfo);
