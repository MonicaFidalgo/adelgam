import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getPreviousIndex = () => {
    return currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  };

  const getNextIndex = () => {
    return currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  };

  const getImagePath = (imageName) => {
    try {
      return require(`../assets/${imageName}`);
    } catch (err) {
      console.error("Image not found:", imageName);
      return ""; // Fallback
    }
  };

  return (
    <div className="relative w-full">
      <div className="hidden md:block relative h-[600px]">
        <div className="flex items-center justify-center h-full gap-4 px-10">
          <button
            onClick={goToPrevious}
            className="absolute left-8 z-10 bg-white rounded-full p-3 button-round hover:bg-gray-100 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center justify-center gap-4 h-full w-full max-w-7xl">
            <div
              className="w-1/4 h-full flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
              onClick={() => onImageClick(getPreviousIndex())}
            >
              <img
                src={getImagePath(images[getPreviousIndex()])}
                alt={`Previous ${getPreviousIndex()}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div
              className="w-1/2 h-full flex-shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-2xl"
              onClick={() => onImageClick(currentIndex)}
            >
              <img
                src={getImagePath(images[currentIndex])}
                alt={`Current ${currentIndex}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div
              className="w-1/4 h-full flex-shrink-0 cursor-pointer overflow-hidden rounded-lg"
              onClick={() => onImageClick(getNextIndex())}
            >
              <img
                src={getImagePath(images[getNextIndex()])}
                alt={`Next ${getNextIndex()}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <button
            onClick={goToNext}
            className="absolute right-8 z-10 bg-white rounded-full p-3 button-round hover:bg-gray-100 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="md:hidden relative">
        <div className="relative h-[400px]">
          <div
            className="w-full h-full cursor-pointer overflow-hidden rounded-lg"
            onClick={() => onImageClick(currentIndex)}
          >
            <img
              src={getImagePath(images[currentIndex])}
              alt={`${currentIndex}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={goToPrevious}
            className="bg-white rounded-full p-3 button-round hover:bg-gray-100 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={goToNext}
            className="bg-white rounded-full p-3 button-round hover:bg-gray-100 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
