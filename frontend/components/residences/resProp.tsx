import React, { Component } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ResPropProp } from "@/data/props";
import api from "@/auth/api";
import { fetchStar } from "../star";
class ResProp extends Component<ResPropProp, { average: number; starRating: JSX.Element | null }> {
  constructor(props: ResPropProp) {
    super(props);
    this.state = {
      average: 0,
      starRating: null, // State to store the star rating JSX
    };
  }

  componentDidMount() {
    this.fetchAverage();
  }

  componentDidUpdate(prevProps: ResPropProp) {
    if (prevProps.uniName !== this.props.uniName || prevProps.resName !== this.props.resName) {
      this.fetchAverage();
    }
  }

  fetchAverage = async () => {
    try {
      const { uniName, resName } = this.props;
      const response = await api.get(`/average_rating/${uniName}/${resName}/`);
      const average = response.data.average || 0;
      this.setState({ average });

      console.log(average)
      this.calculateStarRating(average);
    } catch (e) {}
  };

  calculateStarRating = (average: number) => {
    const starRating = fetchStar(average);
    this.setState({ starRating });

  };

  render() {
    const { uniName, resName, resImageLink, rating } = this.props;
    const { starRating } = this.state;

    return (
      <Link
        href="/universities/[uniName]/residences/[resName]"
        as={`/universities/${encodeURIComponent(uniName)}/residences/${encodeURIComponent(resName)}`}
      >
        <motion.div
          className="card lg:card-side bg-base-100 w-full shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <figure>
            <img src={resImageLink} alt="logo" className="h-64" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{resName}</h2>
            {starRating}
          </div>
        </motion.div>
      </Link>
    );
  }
}

export default ResProp;
