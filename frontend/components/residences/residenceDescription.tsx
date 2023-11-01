import {Component} from 'react'
import Rating from '@/components/rating'
import axios from 'axios'
import Cookies from 'js-cookie'
import Map from '@/components/map'

type resDescProps = {
    residence: string | string[]
    pricing: string | string[]
    rating: string | string[]
    style: string 
}
type gmapState = {
    address: string | string[]
    location: any | any[]
}
class ResidenceDescription extends Component<resDescProps, gmapState> {
    api:any
    constructor(props:resDescProps){
        super(props)
        this.state = {
            address: '',
            location: "",
        }
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          });
    }

    render(){
        const {residence, pricing, style} = this.props
        return(
            <div className = "px-5">
                <div className = " justify-start text-customDefault">
                    <div className ="flex flex-row space-x-3 lg:space-x-0 lg:grid lg:grid-cols-3 lg:text-lg xl:text-xl gap-0">
                        <div className = "font-bold space-y-3">
                            <h4>Price:</h4>
                            <h4>Rating:</h4>
                            <h4>Style:</h4>
                        </div>
                        <div className = "space-y-3 col-span-2">
                            <h4>{pricing}</h4>
                            <h4><Rating rating = {4.3}/></h4>
                            <h4>{style}</h4>
                        </div>
                        
                    </div>
                    <Map residence = {residence} />
                </div>
            </div>
        )
    }
}

export default ResidenceDescription