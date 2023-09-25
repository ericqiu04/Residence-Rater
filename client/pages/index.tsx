import React from "react";
import Link from "next/link";

class Home extends React.Component {
  render() {
    return (
      <>
        <div className="">
          {/* NAVBAR */}
          <nav className="p-4">
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link href="/">
                    <h3 className="text-default font-bold text-xl">
                      Residence Rater
                    </h3>
                  </Link>
                </div>
                <div className="flex items-center space-x-10"> {/* Changed from hidden md:flex */}
                  <Link href="/residences">
                    <h4 className="text-default text-lg">Universities</h4>
                  </Link>
                  {/* Turn into an icon later */}
                  <Link href="/contact">
                    <h4 className="text-default text-lg">Login / Register</h4>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  }
}

export default Home;
