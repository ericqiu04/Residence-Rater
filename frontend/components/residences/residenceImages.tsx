import { Component } from "react";
import { ResImageProps } from "@/data/props";
import {ResImageState} from "@/data/state"
import Image from "next/image";
class ResidenceImages extends Component<ResImageProps, ResImageState> {
  constructor(props: ResImageProps) {
    super(props);
    this.state = {
      selectedImage: 0,
    };
  }

  toImageSlide = (index:number) => {
    

    const {images} = this.props
    if (index > 0 && index <= images.length) {
        this.setState({
            selectedImage:index
        })
        return index
    }
    else if(index < 1) {
        this.setState({
            selectedImage: images.length
        })
        return images.length
    }
    else if(index > images.length) {
        this.setState({
            selectedImage: 1
        })
        return 1
    }
  }



  render() {
    const { images } = this.props;
    return (
      <div className = "px-5">
        <div className="carousel w-full">
          {images.map((image, index) => (
            <div key = {index} id={`slide${index+1}`} className="carousel-item relative w-full">
              <img src={image} alt={`image-${index}`} />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2" >
                <a href={`#slide${this.toImageSlide(index)}`} className="btn btn-circle" >
                  ❮
                </a>
                <a href={`#slide${this.toImageSlide(index+2)}`} className="btn btn-circle" >
                  ❯
                </a>
              </div>
              <h1 className = 'text-xl'>{index}</h1>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ResidenceImages;
