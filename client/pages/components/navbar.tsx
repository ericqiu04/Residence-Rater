import React from "react";
import Link from "next/link";
import { MdSearch } from "react-icons/md";
import { motion } from 'framer-motion';



interface NavbarState {
  showSearchBar: boolean;
  searchQuery: string;
}

class Navbar extends React.Component<{}, NavbarState> {
  state: NavbarState = {
    showSearchBar: false,
    searchQuery: "",
  };

  handleSearchClick = () => {
    this.setState((prev) => ({
      showSearchBar: !prev.showSearchBar,
    }));
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
      <nav className="p-5">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <h3 className="text-default font-bold text-xl">
                  Residence Rater
                </h3>
              </Link>
            </div>
            <div className="flex items-center space-x-10">
              {this.state.showSearchBar && (
                <motion.form
                initial={{ width: 140 }}
                animate={{ width: this.state.showSearchBar ? 175 : 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={this.handleSearchSubmit}
                className="flex items-center search-bar "
            >
                <input
                    type="text"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                    className=" border-b-2 border-solid px-2 w-96 focus:outline-none "
                    placeholder="Search..."
                />
                <MdSearch
                    className="text-default text-xl cursor-pointer"
                    onClick={this.handleSearchSubmit}
                />
            </motion.form>
              )}
              <button onClick={this.handleSearchClick}>
                <MdSearch className="text-default text-xl cursor-pointer z-10" />
              </button>
              <Link href="/residences">
                <h4 className="text-default text-lg">Universities</h4>
              </Link>
              <Link href="/contact">
                <h4 className="text-default text-lg">Login / Register</h4>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
