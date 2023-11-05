import React from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
class UniHome extends React.Component {
  render() {
    return (
      <>
        <div className="container text-customDefault">
          <div className="absolute p-10 inset-0 flex items-center justify-center md:m-20 md:mt-48 lg:m-0">
            <div className="grid lg:grid-cols-2 lg:gap-10">
              <div className="xl:w-2/3 flex flex-col justify-center items-center">
                <div className = "">
                  <h1 className="text-4xl bold">
                    Read Reviews. Write Reviews. Find the best residence for
                    you.
                  </h1>
                  <div className="relative flex items-center mt-4 w-full">
                    <input
                      type="text"
                      className="w-full bg-base-100 rounded-lg py-5 px-4 focus:outline-none border-2 border-light-gray"
                      placeholder="Search University"
                    />
                    <button className="hidden md:flex btn btn-info absolute right-3 border-none bg-buttonStart hover:bg-buttonEnd py-4">
                      Search
                    </button>
                    <button className="md:hidden btn btn-info absolute right-3 border-none bg-buttonStart hover:bg-buttonEnd">
                      <BsSearch size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <img src="/home_banner.jpg" alt="banner" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UniHome;
