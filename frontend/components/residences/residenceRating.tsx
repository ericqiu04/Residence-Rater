import { Component } from "react";
import { RatingState } from "@/data/state";
import { RatingProps } from "@/data/props";

import { BsPerson } from "react-icons/bs";
import api from "@/auth/api";
import Cookies from "js-cookie";
import { FaStar } from "react-icons/fa";
import { withRouter } from "next/router";
import { fetchStar } from "@/components/star";
class ResidenceRating extends Component<RatingProps, RatingState> {
  constructor(props: RatingProps) {
    super(props);
    this.state = {
      message: "",
      rating: 0,
      allRatings: [],
      hover: null,
      user: "",
      uniName: "",
      resName: "",
    };
  }

  async fetchData() {
    const { router } = this.props;
    const { uniName, resName } = router.query;
    
    if (uniName && resName) {
      try {
        const response = await api.get(`fetch_rating/${uniName}/${resName}`);
        const ratings = response.data.ratings;
        this.setState({ uniName, resName, allRatings: ratings });
      } catch (e) {}
    }
  }

  componentDidMount() {
    const user = Cookies.get("email") || "";
    this.setState({ user });
    this.fetchData();
  }

  componentDidUpdate(prevProps: RatingProps) {
    if (
      prevProps.router.query.uniName !== this.props.router.query.uniName ||
      prevProps.router.query.resName !== this.props.router.query.resName
    ) {
      this.fetchData();
    }
  }

  submitRating = async () => {
    const { user, message, rating, uniName, resName } = this.state;
    try {
      const data = {
        user: user,
        message: message,
        rating: rating,
      };
      await api.post(`create_rating/${uniName}/${resName}/`, data);
      this.props.router.reload();
    } catch (e) {}
  };

  createStar = () => {
    return (
      <div className="flex flex-row">
        {Array(5)
          .fill(null)
          .map((_, index) => {
            const currentRating = index + 1;
            return (
              <label key={currentRating}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => this.setState({ rating: currentRating })}
                  style={{ display: "none" }}
                />
                <FaStar
                  className="cursor-pointer"
                  size={25}
                  color={
                    currentRating <= (this.state.hover || this.state.rating)
                      ? "#ffc107"
                      : "#102133"
                  }
                  onMouseEnter={() => this.setState({ hover: currentRating })}
                  onMouseLeave={() => this.setState({ hover: null })}
                />
              </label>
            );
          })}
      </div>
    );
  };

  ratingComponent = (u: string, m: string, r: number, index: number) => {
    return (
      <div
        key={index}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 my-6"
      >
        <div className="flex items-center">
          <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center">
            <BsPerson size={24} color="#333" />
          </div>
          <div className="ml-2">
            <p className=" font-semibold">{u}</p>
            {fetchStar(r)}
          </div>
        </div>
        <p className="mt-2">{m}</p>
      </div>
    );
  };

  createRating = () => {
    const { message, user } = this.state;
    return (
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 my-6 w-full sm:w-1/2">
        <div className="flex items-center">
          <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center">
            <BsPerson size={24} color="#333" />
          </div>
          <div className="ml-2">
            <p className="text-gray-800 font-semibold">{user}</p>
            {this.createStar()}
          </div>
        </div>
        <label htmlFor="message" className="mt-2 text-gray-700">
          Message:
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => this.setState({ message: e.target.value })}
          className="w-full h-20 p-2 rounded border border-gray-300 mt-2"
        />
        <div className="flex mt-2">
          <button
            onClick={this.submitRating}
            className="bg-blue-500 text-white p-2 rounded mr-2 flex-1"
          >
            Submit Rating
          </button>
          <button
            onClick={this.cancel}
            className="bg-gray-300 text-gray-700 p-2 rounded ml-2 flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  cancel = () => {
    this.setState({
      message: "",
      rating: 0,
    });
  };

  render() {
    const { message, rating, user, allRatings } = this.state;
    return (
      <div className="flex justify-start flex-wrap space-x-10 text-customDefault">
        {this.createRating()}
        {allRatings.map((rating, index) =>
          this.ratingComponent(
            rating.user,
            rating.message,
            rating.rating,
            index
          )
        )}
      </div>
    );
  }
}

export default withRouter(ResidenceRating);
