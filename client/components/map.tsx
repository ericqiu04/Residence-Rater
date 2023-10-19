import React, { Component, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import { log } from "console";
type googleMapProps = {
  location: any | any[];
};
type googleMapState = {
  key: string;
};

class Map extends Component<googleMapProps, googleMapState> {
  api: any;
  constructor(props: googleMapProps) {
    super(props);
    this.state = {
      key: "",
    };
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    try {
      const response = await this.api.get("api/get_frontend_key");
      const key = response.data.key;
      this.setState({ key });
    } catch (e) {
      console.log("key failed");
    }
  }

  render() {
    const { location } = this.props;
    console.log(location);
    const { key } = this.state;
    console.log(key)
    const center = {
      lat: 40.71,
      lng: 74.01,
    };

    return (
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          mapContainerStyle={{
            height: "400px",
            width: "100%",
          }}
          center = {center}
          zoom = {15}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    );
  }
}
export default Map;
