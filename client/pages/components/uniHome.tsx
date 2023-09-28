import React from "react";
import {BsSearch} from 'react-icons/bs'
class UniHome extends React.Component {
  render() {
    return (
      <>
        <div className="container mt-20">
          <div
            className="relative bg-cover h-[80vh] bg-center w-screen"
            style={{
              backgroundImage: `url('/uni-background.jpeg')`,
            }}
          >
            <div
              className="h-[80vh] absolute inset-0 bg-cyan-950 opacity-60"
              style={{
                mixBlendMode: "multiply",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center md:justify-start md:ml-10">
              <div className="w-3/4 xl:w-1/2 2xl:w-1/3">
                <h1 className="text-default text-4xl bold">
                  Read Reviews. Write Reviews. Find the best residence for you.
                </h1>
                <div className="relative flex items-center mt-4 w-full">
                  <input
                    type="text"
                    className="w-full bg-base-100 rounded-lg py-5 px-4 focus:outline-none"
                    placeholder="Search University"
                  />
                  <button className="hidden md:flex btn absolute right-3 bg-cyan-800 py-4">
                    Search
                  </button>
                  <button className = "md:hidden btn absolute right-3 bg-cyan-800">
                    <BsSearch size = {20}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UniHome;
