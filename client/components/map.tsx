import React, { Component, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
type googleMapProps = {
  address: string | string[];
  location: any | any[];
};
type googleMapState = {
  key: string;
};

class Map extends Component<googleMapProps, googleMapState> {
  api: any
  constructor(props:googleMapProps){
    super(props)
    this.state = {
      key: ""
    }
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  }

  async componentDidMount() {
    try {
      const response = this.api.get('api/get_frontend_key/')
      const key = response.data.key
      this.setState({key})
    }
    catch (e) {
      console.log('key failed')
    }
  }

  render() {
    const {location} = this.props
    const {key} = this.state
    const mapProps = {
      center: location,
      zoom: 12,
    };

    return (
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap {...mapProps}>
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    );
  }
}
export default Map;
