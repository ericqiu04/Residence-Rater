import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
interface university {
  key: number;
  name: string;
  logo: string;
}

class UniProp extends React.Component<university> {
  constructor(props: university) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return (
      <>
        <Link href="/universities/[name]/residences" as={`/universities/${encodeURIComponent(name)}/residences`}>

          <motion.div
            className="card bg-base-100 p-10 md:p-2 w-60 h-60 md:w-60 md:h-60 shadow-xl"
            whileHover={{ scale: 1.05 }}
            style={{}}
            whileTap={{ scale: 0.95 }}
          >
            <figure className="">
              <img src={this.props.logo} alt="logo" className="h-full" />
            </figure>
            <div className="card-body items-center text-center hidden md:flex">
              <h2 className="card-title">{this.props.name}</h2>
            </div>
          </motion.div>
        </Link>
      </>
    );
  }
}

export default UniProp;
