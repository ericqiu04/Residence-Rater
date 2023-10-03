import router from "next/router";
import React from "react";
import { withRouter } from "next/router";
import Cookies from 'js-cookie'

type State = {
  uniName: string
  residences: any[]
}

class Residences extends React.Component<{},State> {
  constructor(props:any) {
    super(props);
    this.state = {
      uniName: "",
      residences: [],
    };
  }

  async componentDidMount() {
    const { name } = router.query;

    if (name) {
      const decodedName =
        typeof name === "string" ? decodeURIComponent(name) : "";
      this.setState({ uniName: decodedName });

      // Store uniName in local storage
      localStorage.setItem("uniName", decodedName);
    } else {
      // Retrieve uniName from local storage
      const storedUniName = localStorage.getItem("uniName");
      if (storedUniName) {
        this.setState({ uniName: storedUniName });
      }
    }
  }

  render() {
    const { uniName } = this.state;
    console.log('hi')
    console.log(uniName)
    return <div>{uniName}</div>;
  }
}

export default withRouter(Residences);
