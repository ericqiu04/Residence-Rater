import { Component } from "react";
import { RatingState } from "@/data/state";
import { RatingProps } from "@/data/props";
import api from "@/auth/api";
import Cookies from "js-cookie";
class ResidenceRating extends Component<RatingProps, RatingState> {
    
    constructor(props: RatingProps) {
        super(props)
        this.state = {
            message: "",
            rating: 0,
            allRatings: []
        }
    }

    async componentDidMount() {

    }

    async handleFetch() {
        const response = await api.get('fetch_ratings')
        const ratings = response.data.ratings
        await this.setState({allRatings: ratings})
    }

    ratingComponent = (r: number, m: string, u:string) => {
        return(
            <div className = "border-2 w-1/3 flex rounded-xl p-5 flex-col text-customDefault space-y-5 m-10">
                <div className = "flex flex-row space-x-10">
                    <div className = "text-xl">{u}</div>
                    <div className = "text-xl">4/5</div>
                </div>
                <div className = "pl-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae veritatis ipsa architecto accusantium ea rem voluptatum dicta, necessitatibus magni, nihil ad vel quas odit, porro impedit ullam maxime modi perspiciatis?
                </div>
            </div>
        )
    }
    
    render() {
        const {message, rating} = this.state
        const user = Cookies.get('email') || ""
        return (
            <>
                {this.ratingComponent(rating, message, user)}
            </>
        )
    }
    
}

export default ResidenceRating