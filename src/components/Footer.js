import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Container } from "react-bootstrap";
import { ReactComponent as Instagram } from "../icons/instagram-icon.svg";
import { ReactComponent as Whatsapp } from "../icons/whatsapp-icon.svg";
import { ReactComponent as Phone } from "../icons/phone-icon.svg";
import { ReactComponent as Email } from "../icons/email-icon.svg";
import { ReactComponent as Location } from "../icons/location-icon.svg";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <Container>
        <Row className="px-120">
          <Col lg={6}>
            <h6>Adelgam - Promoção Imobiliária</h6>
            <p>{t("contacts.adelgam.description")}</p>
            <div className="d-flex gap-2 mt-3">
              <a
                href="https://www.instagram.com/adelgamlda/"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram />
              </a>
              <a
                href="https://wa.me/351913815379?text=Olá,%20gostaria%20de%20marcar%20uma%20visita!"
                target="_blank"
                rel="noreferrer"
              >
                <Whatsapp />
              </a>
            </div>
          </Col>
          <Col lg={3} className="margin-top-4 mt-lg-0">
            <h6>{t("contacts.more_info")}?</h6>
            <p>{t("contacts.contact_us")}.</p>
            <div className="d-flex gap-3 mt-3">
              <Email />
              <a
                href="mailto:adelgam@adelgam.pt"
                target="_blank"
                rel="noreferrer"
              >
                adelgam@adelgam.pt
              </a>
            </div>
            <div className="d-flex gap-3 mt-3">
              <Phone />
              <span>+351 91 38 153 79</span>
            </div>
          </Col>
          <Col lg={3} className="margin-top-4 mt-lg-0">
            <h6>{t("contacts.location")}?</h6>
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
        <hr />
        <Row className="py-60">
          <div className="copyright">
            <p>© Copyright 2026 - Adelgam Promoção Imobiliária</p>
          </div>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;
