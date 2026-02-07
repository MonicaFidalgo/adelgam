import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import GoogleMap from "../components/Map";
import image2 from "../assets/image-2.png";

const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Container className="pt-200 ">
        <div className="banner-heading mb-4">
          <label className="label mb-4">{t("about.banner_label")}</label>
          <h2 className="heading-big">{t("about.banner_heading")}</h2>
        </div>
        <hr />
        <Row className="my-60">
          <Col lg={6} className="align-self-center">
            <div>
              <label className="label mb-4">{t("about.section_label")}</label>
              <h2 className="heading mb-4">{t("about.section_heading")}</h2>
              <p dangerouslySetInnerHTML={{ __html: t("about.paragraph_1") }} />
              <p>{t("about.paragraph_2")}</p>
              <p>{t("about.paragraph_3")}</p>
              <p>{t("about.paragraph_4")}</p>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <img src={image2} alt="sala e cozinha" width="100%" />
          </Col>
        </Row>
        <hr />
        <div className="contacts-map">
          <label className="label mb-4">{t("contacts.location")}</label>
          <h2 className="heading-big">{t("contacts.visit_us")}</h2>
        </div>

        <GoogleMap location="Adelgam" width="100%" height="400" />
      </Container>
    </div>
  );
};
export default About;
