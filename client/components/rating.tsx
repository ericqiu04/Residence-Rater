import { Component } from "react";
import { BsCircle } from "react-icons/bs";
type ratingProps = {
  rating: number;
};
class Rating extends Component<ratingProps> {
  constructor(props: ratingProps) {
    super(props);
  }

  render() {
    const { rating } = this.props;
    return (
      <div className="flex flex-row">
        {Array.from({ length: 5 }).map((_, index) => (
          <BsCircle
            key={index}
            className= {`m-0 mr-2 ${index < rating ? "text-customDefault" : "text-white"}`}
            size={30}
          />
        ))}
      </div>
    );
  }
}

export default Rating