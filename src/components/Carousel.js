import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      centerMode
    >
      {images.map((image, index) => {
        const projectImagePath = require(`../assets/${image}`);

        return (
          <div key={index} style={{ margin: "0 20px", textAlign: "center" }}>
            <img
              src={projectImagePath}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", borderRadius: "4px" }}
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageCarousel;
