import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Premium from "../icons/premium-icon.svg";
import People from "../icons/people-icon.svg";
import Star from "../icons/star-icon.svg";
import Location from "../icons/location-big-icon.svg";

const iconMap = {
  people: People,
  premium: Premium,
  star: Star,
  location: Location,
};

const Details = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Row>
      {data &&
        data?.map((item, key) => {
          const iconPath = iconMap[item.icon];

          return (
            <Col md={3} key={key}>
              <div className="details">
                {iconPath && (
                  <img
                    src={iconPath}
                    className="icon"
                    alt={item.title}
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
                <h4 className="mb-2 mt-3">{t(item.title)}</h4>
                <p>{t(item.description)}</p>
              </div>
            </Col>
          );
        })}
    </Row>
  );
};
export default Details;
