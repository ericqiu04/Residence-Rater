import { Component } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import axios from 'axios'
type googleMapProps = {
  address: string | string[];
  location: any | any[];
};
type state = {
    key: string;
}
class Map extends Component<googleMapProps, state> {
    api:any
    constructor(props:googleMapProps) {
        super(props)
        this.state = {
            key: ''
        }
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          });
    }

    async componentDidMount() {
        try{
            const response = this.api.get('/api/get_key/')
            const key = response.data.key
            console.log(key)
            this.setState({key})
        }
        catch {}
    }
  render() {
    const {key} = this.state
    console.log(key)
    const { address, location } = this.props;
    return (
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          zoom={10}
          center={location}
          mapContainerStyle={containerStyle}
        ></GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;

const containerStyle = {
    width:'100%',
    height:'50vh'
}