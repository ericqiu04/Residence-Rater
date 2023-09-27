import React from "react";
import Link from "next/link";
import { MdSearch } from "react-icons/md";
import { motion } from "framer-motion";
import {AiOutlineMenu} from 'react-icons/ai'
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

  SideBar = () => {
    return (
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <div className="menu min-h-full p-4 w-80">
          <Link href="/residences">
            <h4 className="text-default text-lg">Universities</h4>
          </Link>
          <Link href="/contact">
            <h4 className="text-default text-lg">Login / Register</h4>
          </Link>
          <input
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            className="input"
            size={30}
            placeholder="Search..."
          />
          <button onClick={this.handleSearchSubmit} className="btn btn-ghost">
            <MdSearch className="text-default text-xl cursor-pointer z-10" />
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <nav className="p-5 w-full">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <h3 className="text-default font-bold text-xl">
                  Residence Rater
                </h3>
              </Link>
            </div>
            <div className="items-center space-x-10 hidden lg:flex">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={this.state.searchQuery}
                  onChange={this.handleSearchChange}
                  className="input"
                  size={30}
                  placeholder="Search..."
                />
                <button
                  onClick={this.handleSearchSubmit}
                  className="btn btn-ghost"
                >
                  <MdSearch className="text-default text-xl cursor-pointer z-10" />
                </button>
              </div>

              <Link href="/residences">
                <h4 className="text-default text-lg">Universities</h4>
              </Link>
              <Link href="/contact">
                <h4 className="text-default text-lg">Login / Register</h4>
              </Link>
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  className="btn btn-square btn-ghost"
                >
      
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
