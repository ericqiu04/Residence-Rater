import React from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
interface NavbarState {
  isMenuOpen: boolean;
  searchQuery: string;
}

class Navbar extends React.Component<{}, NavbarState> {
  state: NavbarState = {
    isMenuOpen: false,
    searchQuery: "",
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", this.state.searchQuery);
    // Add your search logic here
  };

  render() {
    return (
      <div className="drawer drawer-end fixed top-0 z-10 xl:px-48 bg-base-100">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/*main nav */}
          <nav className="p-5 w-full">
            <div className="flex items-center justify-between ">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <h3 className="text-default font-bold text-2xl">
                    Residence Rater
                  </h3>
                </Link>
              </div>

              <div className="items-center space-x-10 hidden lg:flex">

                <Link href="/universities">
                  <h4 className="text-default text-xl">Universities</h4>
                </Link>
                <Link href="/authenticate">
                  <h4 className="text-default text-xl">Login / Register</h4>
                </Link>
              </div>
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  className="btn btn-square btn-ghost"
                >
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
              <Link href="/universities">
                <h4 className="text-default text-lg">Universities</h4>
              </Link>
              <Link href="/authenticate">
                <h4 className="text-default text-lg">Login / Register</h4>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
