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

    const overlayStyles = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0,
      transition: "opacity 0.2s ease-in-out",
    };

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
