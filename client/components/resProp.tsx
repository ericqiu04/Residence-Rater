import Link from "next/link";
import { Component } from "react";
import { motion } from "framer-motion";

interface resProp {
  resName: string;
  resImageLink: any;
  rating: string;
  uniName: string;
}

class ResProp extends Component<resProp, {}> {
  constructor(props: resProp) {
    super(props);
  }

  render() {
    const { uniName, resName, resImageLink, rating } = this.props;

    return (
      <Link href = "/universities/[uniName]/residences/[resName]" as={`/universities/${encodeURIComponent(uniName)}/residences/${encodeURIComponent(resName)}`}>
        <motion.div
          className="card lg:card-side bg-base-100 w-full shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <figure>
            <img src={resImageLink} alt="logo" className="h-64" />
          </figure>
          <div className="card-body items-center text-center ">
            <h2 className="card-title">{resName}</h2>
            <h2 className="text-xl">Rating: {rating}</h2>
          </div>
        </motion.div>
      </Link>
    );
  }
}

export default ResProp;
