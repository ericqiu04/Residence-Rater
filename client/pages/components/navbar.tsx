import React from "react";
import Link from "next/link";
import { MdSearch } from "react-icons/md";

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
            <div className="flex items-center space-x-10">
              {this.state.showSearchBar && (
                <form
                  onSubmit={this.handleSearchSubmit}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                    className="border rounded py-1 px-2"
                    placeholder="Search..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Search
                  </button>
                </form>
              )}
              <button onClick={this.handleSearchClick}>
                <MdSearch className="text-default text-xl cursor-pointer" />
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
