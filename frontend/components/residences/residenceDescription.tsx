import {Component} from 'react'
import Rating from '@/components/rating'
import axios from 'axios'
import Map from '@/components/map'
import { gmapState } from '@/data/state'
import { resDescProps } from '@/data/props'
class ResidenceDescription extends Component<resDescProps, gmapState> {
    constructor(props:resDescProps){
        super(props)
        this.state = {
            address: '',
            location: "",
        }
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