import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row className="px-120">
          <Col lg={4}>
            <h6>Adelgam - Promoção Imobiliária</h6>
          </Col>
          <Col lg={4}>
            <h6>Precisa de mais informações?</h6>
          </Col>
          <Col lg={4}>
            <h6>Onde estamos?</h6>
          </Col>
        </Row>
        <hr />
        <Row className="px-60">
          <Col lg={12}>
            <div className="copyright">
              <p>© Copyright 2024 - Adelgam Promoção Imobiliária</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;
