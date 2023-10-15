import { Component } from "react";

type resImageProps = {
  images: any[];
};

type resImageState = {
  selectedImage: any;
};

class ResidenceImages extends Component<resImageProps, resImageState> {
  constructor(props: resImageProps) {
    super(props);
    this.state = {
      selectedImage: 0,
    };
  }

  toImageSlide = (index:number) => {
    const {images} = this.props
    if (index > 0 && index < images.length) {
        this.setState({
            selectedImage:index
        })
        return index
    }
    else if(index == 0) {
        this.setState({
            selectedImage: 0
        })
        return 0
    }
    else if(index >= images.length) {
        this.setState({
            selectedImage: images.length
        })
        return images.length
    }
  }


  render() {
    const { images } = this.props;
    return (
      <>
        <div className="carousel w-full">
          {images.map((image, index) => (
            <div id={`slide${index}`} className="carousel-item relative w-full">
              <img src={image} alt={`image-${index}`} />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`slide${this.toImageSlide(index -1)}`} className="btn btn-circle" onClick = {() => this.toImageSlide(index -1)}>
                  ❮
                </a>
                <a href={`slide${this.toImageSlide(index -1)}`} className="btn btn-circle" onClick = {() => this.toImageSlide(index -1)}>
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ResidenceImages;
