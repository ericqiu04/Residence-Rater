import React from "react";
import Head from "next/head";

import UniHome from "@/components/uniHome";
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
            name="description"
            content="Explore Residence Rater's landing page with a user-friendly navigation bar for easy login, signup, and university search. Find the best university accomodations and access valuable reviews. Join now to post your review!"
          />
        </Head>
        <div className="w-full fadeIn">
          <UniHome />
        </div>
      </>
    );
  }
}

export default Home;
