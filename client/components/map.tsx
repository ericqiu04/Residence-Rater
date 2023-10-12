import React, { Component, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import axios from "axios";
type googleMapProps = {
  address: string | string[];
  location: any | any[];
};
type state = {
  key: string;
  map: any;
};
class Map extends Component<googleMapProps, state> {
  api: any;
  constructor(props: googleMapProps) {
    super(props);
    this.state = {
      key: "",
      map: null,
    };
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    try {
      const response = this.api.get("/api/get_key/");
      const key = response.data.key;
      console.log(key);
      this.setState({ key });
    } catch {}
  }
  render() {
    const { key } = this.state;
    const { address, location } = this.props;

    return (
      <LoadScript googleMapsApiKey= 'hello'>
        <GoogleMap zoom={10} center={location}></GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
