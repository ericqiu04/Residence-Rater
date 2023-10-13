import React, { Component, useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import axios from "axios";
type googleMapProps = {
  address: string | string[];
  location: any | any[];
};
type state = {
  key: string;
  map: any;
};

class Map extends Component<googleMapProps,{}>{
  
  render() {
    return(
      <GoogleMap defaultZoom = {15} defaultCenter = {this.props.location}>
          <Marker position = {this.props.location}/>
      </GoogleMap>
    )
  }
}
const WrappedMap = withScriptjs(withGoogleMap(Map))
export default WrappedMap;
