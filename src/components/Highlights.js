import React from "react";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Location } from "../icons/location-big-icon.svg";
import { ReactComponent as Status } from "../icons/status-icon.svg";
import { ReactComponent as Home } from "../icons/house-icon.svg";

const Higlights = ({ typology, state, location }) => {
  return (
    <Row>
      <Col lg={4}>
        <div className="hightlights">
          <Location />
          <label>Localização</label>
          <span>{location}</span>
        </div>
      </Col>
      <Col lg={4}>
        <div className="hightlights">
          <Status />
          <label>Estado</label>
          <span>{state}</span>
        </div>
      </Col>
      <Col lg={4}>
        <div className="hightlights">
          <Home />
          <label>Tipologias</label>
          <span>{typology}</span>
        </div>
      </Col>
    </Row>
  );
};
export default Higlights;
