import { Gallery, Item } from "react-photoswipe-gallery";

export default function ImageGallery({ images }) {
  return (
    <Gallery>
      <div className="project-details-list-images">
        {images.slice(0, 2).map((item, index) => {
          const projectImagePath = require(`../assets/${item.image}`);

          return (
            <Item
              key={index}
              original={projectImagePath}
              thumbnail={projectImagePath}
              width={item?.width ?? "1600"}
              height={item?.height ?? "1600"}
            >
              {({ ref, open }) => (
                <div>
                  <img
                    className="project-details-list-image"
                    ref={ref}
                    src={projectImagePath}
                    alt={item.text}
                    onClick={open}
                    width="100%"
                  />
                  <span>{item.text}</span>
                </div>
              )}
            </Item>
          );
        })}
      </div>

      {/* The third image is also included in the Gallery */}
      {images.slice(2).map((item, index) => {
        const projectImagePath = require(`../assets/${item.image}`);
        return (
          <Item
            key={index + 2}
            original={projectImagePath}
            thumbnail={projectImagePath}
            width={item?.width ?? "1600"}
            height={item?.height ?? "1600"}
          >
            {({ ref }) => <div ref={ref} style={{ display: "none" }} />}
          </Item>
        );
      })}
    </Gallery>
  );
}
