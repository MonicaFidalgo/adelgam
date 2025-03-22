import { useState } from "react";
import Carousel from "react-multi-carousel";
import { ReactComponent as ArrowLeft } from "../icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../icons/arrow-right.svg";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
  },
  tablet: {
    breakpoint: {
      max: 1023,
      min: 768,
    },
    items: 1,
  },
  mobile: {
    breakpoint: {
      max: 767,
      min: 0,
    },
    items: 1,
  },
};

const CustomArrow = ({ onClick, direction }) => {
  const buttonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "white",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    boxShadow: "0px 0px 38px #BD9A68",
    zIndex: 10,
    left: direction === "left" ? "10px" : "auto",
    right: direction === "right" ? "10px" : "auto",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {direction === "left" ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
};

const ImageCarousel = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  const closeModal = () => setSelectedIndex(null);
  return (
    <>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        centerMode
        customLeftArrow={<CustomArrow direction="left" />}
        customRightArrow={<CustomArrow direction="right" />}
      >
        {images.map((image, index) => {
          const projectImagePath = require(`../assets/${image}`);

          return (
            <div key={index} style={{ textAlign: "center", height: "100%" }}>
              <img
                src={projectImagePath}
                alt={`Slide ${index + 1}`}
                style={{ width: "100%", height: "100%", borderRadius: "4px" }}
                onClick={() => setSelectedIndex(index)}
              />
            </div>
          );
        })}
      </Carousel>

      {/* Modal for Enlarged Image */}
      {selectedIndex !== null && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            flexDirection: "column",
          }}
        >
          {/* Click outside to close */}
          <img
            src={require(`../assets/${images[selectedIndex]}`)}
            alt="Enlarged"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgb(254, 250, 250)",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0px 0px 38px #BD9A68",
            }}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            style={{
              position: "absolute",
              right: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgb(254, 250, 250)",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0px 0px 38px #BD9A68",
            }}
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
