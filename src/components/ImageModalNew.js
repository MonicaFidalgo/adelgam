import { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageModal = ({
  isOpen,
  imageUrl,
  onClose,
  onNext,
  onPrevious,
  currentIndex,
  totalImages,
}) => {
  const [scale, setScale] = useState(1);
  const transformRef = useRef(null);

  // Reset zoom when modal closes or image changes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      if (transformRef.current) {
        transformRef.current.resetTransform();
      }
    }
  }, [isOpen, imageUrl]);

  const handleClose = () => {
    setScale(1);
    onClose();
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e) => {
      if (scale > 1) return; // Don't navigate if zoomed

      if (e.key === "ArrowLeft") {
        onPrevious();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line
  }, [isOpen, scale, onNext, onPrevious]);

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        zIndex: 9999,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-dialog modal-fullscreen m-0">
        <div className="modal-content bg-transparent border-0">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="position-absolute top-0 end-0 m-4 btn btn-light rounded-circle p-3 shadow-lg"
            style={{ zIndex: 10000 }}
            aria-label="Fechar"
          >
            <X size={24} />
          </button>

          {/* Image Counter */}
          <div
            className="position-absolute top-0 start-50 translate-middle-x mt-4 bg-dark bg-opacity-75 text-white px-4 py-2 rounded-pill"
            style={{ zIndex: 10000 }}
          >
            {currentIndex + 1} / {totalImages}
          </div>

          {/* Navigation Arrows - Only when not zoomed */}
          {scale <= 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={onPrevious}
                className="position-absolute top-50 start-0 translate-middle-y ms-4 btn btn-light rounded-circle p-3 shadow-lg d-none d-md-flex"
                style={{ zIndex: 10000 }}
                aria-label="Anterior"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Next Button */}
              <button
                onClick={onNext}
                className="position-absolute top-50 end-0 translate-middle-y me-4 btn btn-light rounded-circle p-3 shadow-lg d-none d-md-flex"
                style={{ zIndex: 10000 }}
                aria-label="Próximo"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Zoom Controls - Desktop Only */}
          <div
            className="position-absolute bottom-0 end-0 m-4 d-none d-md-flex gap-2"
            style={{ zIndex: 10000 }}
          >
            <button
              onClick={() => transformRef.current?.zoomOut()}
              disabled={scale <= 1}
              className="btn btn-light rounded-circle p-3 shadow-lg"
              aria-label="Zoom out"
            >
              <ZoomOut size={24} />
            </button>
            <button
              onClick={() => transformRef.current?.zoomIn()}
              disabled={scale >= 3}
              className="btn btn-light rounded-circle p-3 shadow-lg"
              aria-label="Zoom in"
            >
              <ZoomIn size={24} />
            </button>
          </div>

          {/* Image with Zoom/Pan */}
          <div className="modal-body p-0 d-flex align-items-center justify-content-center">
            <TransformWrapper
              ref={transformRef}
              initialScale={1}
              minScale={1}
              maxScale={3}
              centerOnInit={true}
              wheel={{ disabled: false }}
              doubleClick={{ disabled: false, mode: "zoomIn" }}
              onTransformed={(ref) => {
                setScale(ref.state.scale);
              }}
              // Panning configuration
              panning={{
                disabled: scale <= 1,
                velocityDisabled: false,
              }}
              // Enable smooth animations
              smooth={true}
              velocityAnimation={{
                sensitivity: 1,
                animationTime: 400,
                animationType: "easeOutQuad",
              }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <TransformComponent
                    wrapperStyle={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      touchAction: scale > 1 ? "none" : "pan-y", // Allow vertical scroll when not zoomed
                    }}
                    contentStyle={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // Enable swipe when not zoomed (mobile only)
                        touchAction: scale <= 1 ? "pan-x" : "none",
                      }}
                      onTouchStart={(e) => {
                        if (scale <= 1) {
                          // Store touch start position
                          const touch = e.touches[0];
                          e.currentTarget.touchStartX = touch.clientX;
                        }
                      }}
                      onTouchEnd={(e) => {
                        if (scale <= 1 && e.currentTarget.touchStartX) {
                          const touch = e.changedTouches[0];
                          const diffX =
                            e.currentTarget.touchStartX - touch.clientX;
                          const threshold = 50; // Minimum swipe distance

                          if (Math.abs(diffX) > threshold) {
                            if (diffX > 0) {
                              // Swiped left - go to next
                              onNext();
                            } else {
                              // Swiped right - go to previous
                              onPrevious();
                            }
                          }
                        }
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt="Vista ampliada"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100vh",
                          objectFit: "contain",
                          userSelect: "none",
                          pointerEvents: scale > 1 ? "auto" : "none",
                        }}
                        draggable={false}
                      />
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-light:hover:not(:disabled) {
          background-color: #bd9a68 !important;
          color: white !important;
          transition: all 0.3s ease;
        }

        .modal {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageModal;
