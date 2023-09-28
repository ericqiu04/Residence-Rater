import React from "react";
import Head from "next/head";

import Navbar from "./components/navbar";
import UniHome from "./components/uniHome";

class Home extends React.Component {
  state = {
    showSearchBar: false,
    searchQuery: "",
  };

  handleClick = {};

  render() {
    return (
      <>
        <Head>
          <title>Home | Residence Rater</title>
          <meta
            name="landing page"
            content="landing page for Residence Rater. Page will include a navigation bar to login or signup and find universities, as well as a button that navigates to the universities."
          />
        </Head>
        <div className="w-full fadeIn">
          {/* NAVBAR */}
          <Navbar />
          <UniHome/>
        </div>
      </>
    );
  }
}

export default Home;
