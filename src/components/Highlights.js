import React from "react";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Location } from "../icons/location-big-icon.svg";
import { ReactComponent as Status } from "../icons/status-icon.svg";
import { ReactComponent as Home } from "../icons/rooms-icon.svg";

const Higlights = () => {
  return (
    <Row>
      <Col lg={4}>
        <div className="hightlights">
          <Location />
          <label>Localização</label>
          <span>Alcochete</span>
        </div>
      </Col>
      <Col lg={4}>
        <div className="hightlights">
          <Status />
          <label>Estado</label>
          <span>Concluído</span>
        </div>
      </Col>
      <Col lg={4}>
        <div className="hightlights">
          <Home />
          <label>Tipologias</label>
          <span>T1 a T4 Penthouse II</span>
        </div>
      </Col>
    </Row>
  );
};
export default Higlights;
