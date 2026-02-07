import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Location } from "../icons/location-icon.svg";
import { ReactComponent as Phone } from "../icons/phone-icon.svg";
import { ReactComponent as Email } from "../icons/email-icon.svg";

const ContactsSection = () => {
  const { t } = useTranslation();
  return (
    <div className="contacts-wrapper">
      <Row>
        <Col lg={6}>
          <h4 className="mb-3">{t("contacts.contact_us.2")}</h4>
          <div className="d-flex gap-2 mb-2">
            <Email /> <a href="mailto:adelgam@adelgam.pt">adelgam@adelgam.pt</a>
          </div>
          <div className="d-flex gap-2">
            <Phone />
            <a href="tel:+351 91 38 153 79">+351 91 38 153 79</a>
          </div>
        </Col>
        <Col lg={6}>
          <h4 className="mb-3 mt-4 mt-md-0">{t("contacts.location")}</h4>

          <div className="d-flex gap-2">
            <Location />
            <address>
              Rua de Maputo
              <br />
              2870-437 Montijo
              <br />
              Portugal
            </address>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ContactsSection;
