import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ReactComponent as Instagram } from "../icons/instagram-icon.svg";
import { ReactComponent as Whatsapp } from "../icons/whatsapp-icon.svg";
import { ReactComponent as Phone } from "../icons/phone-icon.svg";
import { ReactComponent as Email } from "../icons/email-icon.svg";
import { ReactComponent as Location } from "../icons/location-icon.svg";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row className="px-120">
          <Col lg={6}>
            <h6>Adelgam - Promoção Imobiliária</h6>
            <p>
              A Adelgam é uma empresa que centra a sua atividade na área da
              Construção Civil e Promoção Imobiliária, a atuar no mercado há
              mais de 25 anos.
            </p>
            <div className="d-flex gap-2 mt-3">
              <a
                href="https://www.instagram.com/adelgamlda/"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram />
              </a>
              <a
                href="https://web.whatsapp.com/send?phone=+351913815379"
                target="_blank"
                rel="noreferrer"
              >
                <Whatsapp />
              </a>
            </div>
          </Col>
          <Col lg={3} className="margin-top-4 mt-lg-0">
            <h6>Precisa de mais informações?</h6>
            <p>Entre em contacto connosco.</p>
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
            <h6>Onde estamos?</h6>
            <div className="d-flex gap-2">
              <Location />
              <address>
                Rua José Batista Canteiro 83 <br />
                2890-006 Alcochete <br />
                Portugal
              </address>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="px-60">
          <Col lg={12}>
            <div className="copyright">
              <p>© Copyright 2025 - Adelgam Promoção Imobiliária</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;
