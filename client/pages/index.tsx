import React from "react";
import Navbar from "./components/navbar";
class Home extends React.Component {
  state = {
    showSearchBar: false,
    searchQuery: ""
  }

  handleClick = {

  }

  render() {
    return (
      <>
        <div className="w-full">
          {/* NAVBAR */}
          <Navbar/>
        </div>
      </>
    );
  }
}

export default Home;
