import React from "react";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Location } from "../icons/location-icon.svg";
import { ReactComponent as Phone } from "../icons/phone-icon.svg";
import { ReactComponent as Email } from "../icons/email-icon.svg";

const ContactsSection = () => {
  return (
    <div className="contacts-wrapper">
      <Row>
        <Col lg={6}>
          <h4 className="mb-4">Contacte-nos</h4>
          <div className="d-flex gap-2 mb-2">
            <Email /> <a href="mailto:adelgam@adelgam.pt">adelgam@adelgam.pt</a>
          </div>
          <div className="d-flex gap-2">
            <Phone />
            <a href="tel:+351 91 38 153 79">+351 91 38 153 79</a>
          </div>
        </Col>
        <Col lg={6}>
          <h4 className="mb-4">Onde estamos?</h4>

          <div className="d-flex gap-2">
            <Location />
            <address>
              Augusto Dias da Silva
              <br />
              2870-437 Montijo
              <br />
              PORTUGAL
            </address>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ContactsSection;
