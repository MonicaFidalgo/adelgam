import { Gallery, Item } from "react-photoswipe-gallery";
import { useTranslation } from "react-i18next";

export default function ImageGallery({ images }) {
  const { t } = useTranslation();
  return (
    <Gallery>
      <div className="project-details-list-images">
        {images.map((item, index) => {
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
                    alt={item?.text ? t(item.text) : ""}
                    onClick={open}
                    width="100%"
                  />
                  {item?.text && <span>{t(item.text)}</span>}
                </div>
              )}
            </Item>
          );
        })}
      </div>

    </Gallery>
  );
}
