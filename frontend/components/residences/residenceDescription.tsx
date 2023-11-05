import { Component } from "react";
import axios from "axios";
import Map from "@/components/map";
import { ResDescState } from "@/data/state";
import { resDescProps } from "@/data/props";
import { fetchStar } from "@/components/star";
import api from "@/auth/api";
import Cookies from "js-cookie";
class ResidenceDescription extends Component<resDescProps, ResDescState> {
  constructor(props: resDescProps) {
    super(props);
    this.state = {
      address: "",
      location: "",
      average: 0,
      uniName: "",
      resName: "",
      starRating: null,
    };
  }

  componentDidMount() {
    const {uniName, resName} = this.props
    this.fetchAverage();
  }

  componentDidUpdate(prevProps: resDescProps) {
    if (prevProps.uniName !== this.props.uniName || prevProps.resName !== this.props.resName) {
      this.fetchAverage();
    }
  }

  fetchAverage = async () => {
    try {
      const { uniName, resName } = this.props;
      const response = await api.get(`/average_rating/${uniName}/${resName}`);
      const average = response.data.average || 0;
      Cookies.set('uniName', uniName)
      this.calculateStarRating(average);
    } catch (e) {
      const {average} = this.state
      this.calculateStarRating(average)
    }
  };

  calculateStarRating = (average: number) => {
    const starRating = fetchStar(average);
    this.setState({ starRating });

  };

  

  render() {
    const { residence, pricing, style } = this.props;
    const {starRating} = this.state
    return (
      <div className="px-5 ">
        <div className="flex flex-row md:flex-col justify-start items-center md:items-start text-customDefault space-x-5 md:space-x-0 md:space-y-5">
          <div className="flex flex-row space-x-3 lg:space-x-0 lg:grid lg:grid-cols-3 lg:text-lg xl:text-xl gap-0">
            <div className="font-bold space-y-3">
              <h4>Price:</h4>
              <h4>Rating:</h4>
              <h4>Style:</h4>
            </div>
            <div className="space-y-3 col-span-2">
              <h4>{pricing}</h4>
              <h4>
                {starRating}
              </h4>
              <h4>{style}</h4>
            </div>
          </div>
          <div className="w-full aspect-square">
            <div className="aspect-square-inner">
              <Map residence={residence} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResidenceDescription;
