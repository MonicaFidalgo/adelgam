import React from "react";
import { Col, Row } from "react-bootstrap";
import { ReactComponent as House } from "../icons/house-icon.svg";
import { ReactComponent as Outside } from "../icons/outside-icon.svg";
import { ReactComponent as Parking } from "../icons/parking-icon.svg";
import { ReactComponent as TotalArea } from "../icons/total-area-icon.svg";
import { ReactComponent as LivingRoom } from "../icons/living-room-icon.svg";
import { ReactComponent as DinningRoom } from "../icons/dinning-room-icon.svg";
import { ReactComponent as Pool } from "../icons/pool-icon.svg";
import { ReactComponent as Office } from "../icons/office-icon.svg";
import { ReactComponent as Rooms } from "../icons/rooms-icon.svg";

const iconMap = {
  house: House,
  outside: Outside,
  parking: Parking,
  "total-area": TotalArea,
  "living-room": LivingRoom,
  office: Office,
  rooms: Rooms,
  "dinning-room": DinningRoom,
  pool: Pool,
};

const DetailsIcons = ({ data }) => {
  return (
    <Row>
      {data &&
        data?.map((item, key) => {
          const IconComponent = iconMap[item.icon];

          return (
            <Col md={3} xs={6} key={key}>
              <div className="details-icons">
                {IconComponent && <IconComponent className="icon" />}
                <p className="mb-1 mt-2">{item.title}</p>
                <span>{item.description}</span>
              </div>
            </Col>
          );
        })}
    </Row>
  );
};
export default DetailsIcons;
