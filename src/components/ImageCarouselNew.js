import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageCarousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const getImagePath = (imageName) => {
    try {
      return require(`../assets/${imageName}`);
    } catch (err) {
      console.error("Image not found:", imageName);
      return null;
    }
  };

  return (
    <div className="image-carousel-container">
      {/* Desktop Version - 3 columns with autoplay */}
      <div className="d-none d-md-block">
        <div className="position-relative" style={{ height: "600px" }}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            centeredSlides={false}
            loop={images.length >= 3}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            slidesPerGroup={1}
            className="h-100"
          >
            {images.map((image, index) => {
              const imagePath = getImagePath(image);

              return (
                <SwiperSlide key={`desktop-${index}`}>
                  {({ isActive }) => (
                    <div
                      className={`position-relative h-100 rounded-3 overflow-hidden cursor-pointer transition-all ${
                        isActive ? "shadow-lg" : "opacity-75"
                      }`}
                      onClick={() => imagePath && onImageClick(index)}
                      style={{
                        transform: isActive ? "scale(1)" : "scale(0.92)",
                        transition: "all 0.5s ease",
                      }}
                    >
                      {imagePath ? (
                        <img
                          src={imagePath}
                          alt={`Slide ${index + 1}`}
                          className="w-100 h-100 object-fit-cover"
                          style={{
                            filter: isActive
                              ? "brightness(1)"
                              : "brightness(0.7)",
                            transition: "filter 0.5s ease",
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-secondary bg-opacity-10">
                          <span className="text-muted">
                            Imagem não disponível
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom position-absolute top-50 start-0 translate-middle-y bg-white rounded-circle p-3 border-0 ms-3 button-round"
            style={{
              zIndex: 10,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="swiper-button-next-custom position-absolute top-50 end-0 translate-middle-y bg-white rounded-circle p-3 border-0 me-3 button-round"
            style={{
              zIndex: 10,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Image Counter */}
        <div className="text-center mt-3">
          <span className="text-muted">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Mobile Version - Simple swipe with zoom capability */}
      <div className="d-md-none">
        <div className="position-relative" style={{ height: "400px" }}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop={images.length > 1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
            className="h-100"
          >
            {images.map((image, index) => {
              const imagePath = getImagePath(image);

              return (
                <SwiperSlide key={`mobile-${index}`}>
                  <div
                    className="position-relative h-100 rounded-3 overflow-hidden"
                    onClick={() => imagePath && onImageClick(index)}
                  >
                    {imagePath ? (
                      <img
                        src={imagePath}
                        alt={`Slide ${index + 1}`}
                        className="w-100 h-100 object-fit-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-secondary bg-opacity-10">
                        <span className="text-muted">
                          Imagem não disponível
                        </span>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Image Counter Mobile */}
        <div className="text-center mt-3">
          <span className="text-muted">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          background: #bd9a68 !important;
          color: white;
        }

        .swiper-pagination-bullet {
          background: #bd9a68 !important;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
