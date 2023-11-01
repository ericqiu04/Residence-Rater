import React, { Component, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import { log } from "console";
type googleMapProps = {
  residence: string | string[];
};
type googleMapState = {
  key: string;
  location: any | any[];
};

class Map extends Component<googleMapProps, googleMapState> {
  api: any;
  constructor(props: googleMapProps) {
    super(props);
    this.state = {
      key: "",
      location: [{ lat: 0, lng: 0 }],
    };
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    const { residence } = this.props;
    try {
      const response = await this.api.get("get_frontend_key");
      const response2 = await this.api.get(`get_location/${residence}`);
      const key = response.data.key;
      this.setState({ key });
      
      const location = response2.data.location;
      this.setState({ location });
    } catch (e) {
      console.log("key failed");
    }
  }

  render() {
    const { location, key } = this.state;
    const center = {
      lat: location.lat,
      lng: location.lng,
    };

    return (
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          mapContainerStyle={{
            height: "400px",
            width: "100%",
          }}
          center={center}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    );
  }
}
export default Map;
