import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import livroReclamacoes from "../assets/livro-reclamacoes.png";
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
            <h6>{t("footer.title")}</h6>
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
            <div className="footer-contact-list">
              <p>{t("contacts.contact_us")}.</p>
              <div className="d-flex align-items-center gap-3">
                <Email />
                <a
                  href="mailto:adelgam@adelgam.pt"
                  target="_blank"
                  rel="noreferrer"
                >
                  adelgam@adelgam.pt
                </a>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Phone />
                <a href="tel:+351913815379">+351 913 815 379</a>
              </div>
            </div>
          </Col>
          <Col lg={3} className="margin-top-4 mt-lg-0">
            <h6>{t("contacts.location")}</h6>
            <div className="footer-contact-list">
              <div className="d-flex align-items-start gap-3">
                <Location />
                <address>
                  Rua de Maputo
                  <br />
                  2870-437 Montijo
                  <br />
                  Portugal
                </address>
              </div>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="py-60">
          <div className="copyright d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center gap-3">
            <p className="mb-0">
              © 2026 Adelgam - Promoção Imobiliária, Lda.
            </p>
            <div className="d-flex align-items-center gap-4">
              <Link to="/politica-de-privacidade" className="footer-legal-link">
                {t("footer.privacy_policy")}
              </Link>
              <a
                href="https://www.livroreclamacoes.pt/Inicio/"
                target="_blank"
                rel="noopener noreferrer"
                className="livro-reclamacoes"
              >
                <img src={livroReclamacoes} alt="Livro de Reclamações" />
              </a>
            </div>
          </div>
          <p className="footer-ral">
            {t("footer.ral")}{" "}
            <a
              href="https://www.consumidor.gov.pt"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.consumidor.gov.pt
            </a>
            .
          </p>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;
