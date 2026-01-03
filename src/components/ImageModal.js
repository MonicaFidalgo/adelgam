import { useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import useSwipe from "../hooks/useSwipe";

const ImageModal = ({ isOpen, imageUrl, onClose, onNext, onPrevious }) => {
  const [zoom, setZoom] = useState(1);

  const swipeHandlers = useSwipe({
    onLeft: zoom === 1 ? onNext : null,
    onRight: zoom === 1 ? onPrevious : null,
  });

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const handleClose = () => {
    setZoom(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
      {...swipeHandlers}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full h-full overflow-hidden flex items-center justify-center p-4">
        <img
          src={imageUrl}
          alt="Fullscreen view"
          className="max-w-full max-h-full object-contain transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
};

export default ImageModal;
