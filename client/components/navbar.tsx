import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    console.log("Search for:", searchQuery);
    // logic
  };

  const handleNavigation = (route: any) => {
    router.push(route);
    const delayMilliseconds = 500;
    setTimeout(() => {
      router.reload();
    }, delayMilliseconds);
  };

  return (
    <div className="drawer drawer-end fixed top-0 z-10 xl:px-48 bg-base-100">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/*main nav */}
        <nav className="p-5 w-full">
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-4">
              <h3
                className="text-default font-bold text-2xl"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigation("/")}
              >
                Residence Rater
              </h3>
            </div>

            <div className="items-center space-x-10 hidden lg:flex">
              <h4
                className="text-default text-xl"
                onClick={() => handleNavigation("/universities")}
                style={{ cursor: "pointer" }}
              >
                Universities
              </h4>
              <h4
                className="text-default text-xl"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigation("/authentication/login")}
              >
                Login / Register
              </h4>
            </div>
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <AiOutlineMenu size={30} />
              </label>
            </div>
          </div>
        </nav>
      </div>

      {/*Sidebar*/}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 flex">
          <div className="mt-40 flex flex-col space-y-10 justify-center items-center">
            <h4
              className="text-default text-lg"
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigation("/universities")}
            >
              Universities
            </h4>
            <h4
              className="text-default text-lg"
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigation("/authentication/login")}
            >
              Login / Register
            </h4>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
