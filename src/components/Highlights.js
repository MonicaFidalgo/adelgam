import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Location } from "../icons/location-big-icon.svg";
import { ReactComponent as Status } from "../icons/status-icon.svg";
import { ReactComponent as Home } from "../icons/house-icon.svg";

const Higlights = ({ typology, state, location }) => {
  const { t } = useTranslation();
  return (
    <Row>
      <Col lg={4}>
        <div className="hightlights">
          <Location />
          <label>{t("common.location")}</label>
          <span>{location}</span>
        </div>
      </Col>
      <Col lg={4}>
        <div className="hightlights">
          <Status />
          <label>{t("common.estado")}</label>
          <span>{t(state)}</span>
        </div>
      </Col>
      <Col lg={4}>
        <div className="hightlights">
          <Home />
          <label>{t("common.tipologias")}</label>
          <span>{typology}</span>
        </div>
      </Col>
    </Row>
  );
};
export default Higlights;
