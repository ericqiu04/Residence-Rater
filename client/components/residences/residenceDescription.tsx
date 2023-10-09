import {Component} from 'react'
import Rating from '../rating'
type resDescProps = {
    pricing: string | string[]
    rating: string | string[]
    style: string 
}
class ResidenceDescription extends Component<resDescProps, {}> {
    constructor(props:resDescProps){
        super(props)
    }

    render(){
        return(
            <>
                <div className = " justify-start text-customDefault">
                    <div className ="flex flex-row space-x-3 lg:space-x-0 lg:grid lg:grid-cols-3 lg:text-lg xl:text-xl gap-0">
                        <div className = "font-bold space-y-3">
                            <h4>Price:</h4>
                            <h4>Rating:</h4>
                            <h4>Style:</h4>
                        </div>
                        <div className = "space-y-3 col-span-2">
                            <h4>{this.props.pricing}</h4>
                            <h4><Rating rating = {4.3}/></h4>
                            <h4>{this.props.style}</h4>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ResidenceDescription