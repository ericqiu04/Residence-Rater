import React, { Component, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { MapProps } from "@/data/props";
import { MapState } from "@/data/state";
import api from "@/auth/api";

class Map extends Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      key: "",
      location: [{ lat: 0, lng: 0 }],
    };
  
  }

  async componentDidMount() {
    const { residence } = this.props;
    try {
      const response = await api.get("get_frontend_key");
      const response2 = await api.get(`get_location/${residence}`);
      const key = response.data.key;
      this.setState({ key });
      
      const location = response2.data.location;
      this.setState({ location });
    } catch (e) {
      
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
            height: "350px",
            width: "100%",
          }}
          center={center}
          zoom={17}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    );
  }
}
export default Map;
