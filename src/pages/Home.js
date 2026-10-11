import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Details from "../components/Details";
import Projects from "../components/Projects";
import bannerImage from "../assets/adelgam-real-state.webp";
import details from "../data/details.json";
import image1 from "../assets/image-1.png";
import image2 from "../assets/penthouse-lux-terrace-exterior.webp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PORTAS_DO_TEJO_URL, PENTHOUSE_URL } from "../data/externalLinks";

const Home = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Container fluid>
        <Row className="d-none d-lg-flex">
          <Col
            lg={6}
            className="d-flex flex-column justify-content-center pt-5"
          >
            <div className="banner-content">
              <label className="label mb-3"> {t("home.banner.label")}</label>
              <h1 className="banner-title mb-3">Portas do Tejo</h1>
              <h2 className="banner-subtitle mb-3">
                {t("home.banner.description")}
              </h2>
              <a className="button button-primary" href={PORTAS_DO_TEJO_URL}>
                {t("home.banner.button")}
              </a>
            </div>
          </Col>
          <Col lg={6} className="px-0">
            <img src={bannerImage} alt="planeamento" width="100%" />
          </Col>
        </Row>
      </Container>

      <div className="d-lg-none banner-mobile">
        <div className="overlay"></div>
        <div className="banner-content text-center">
          <label className="label mb-3">{t("home.banner.label")}</label>
          <h1 className="banner-title mb-3">Portas do Tejo</h1>
          <h2 className="banner-subtitle mb-3">
            {t("home.banner.description")}
          </h2>

          <a className="button button-primary" href={PORTAS_DO_TEJO_URL}>
            {t("home.banner.button")}
          </a>
        </div>
      </div>

      <Container>
        <hr className="separator-home d-none d-lg-flex" />
        <Details data={details} />
        <hr />
      </Container>
      <Container>
        <Row className="my-60">
          <Col lg={6} className="text-center">
            <img
              src={image1}
              alt="sala e cozinha"
              width="100%"
              className="mb-4 mb-md-0"
            />
          </Col>
          <Col lg={6} className="align-self-center">
            <div>
              <label className="label mb-3">{t("home.adelgam.why")}</label>
              <h2 className="heading mb-3">{t("home.adelgam.subtitle")}</h2>
              <p>{t("home.adelgam.paragraph_1")}</p>
              <p>{t("home.adelgam.paragraph_2")}</p>

              <Link className="button button-primary margin-top-4" to="/sobre">
                {t("home.adelgam.know")}
              </Link>
            </div>
          </Col>
        </Row>
        <hr />
      </Container>
      <Container>
        <Row className="my-60">
          <Col
            lg={{ span: 6, order: 1 }}
            xs={{ order: 2 }}
            className="align-self-center"
          >
            <div>
              <label className="label mb-3">{t("home.highlight.label")}</label>
              <h2 className="heading mb-3">{t("home.highlight.title")}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("home.highlight.description"),
                }}
              />

              <a
                className="button button-primary margin-top-4"
                href={PENTHOUSE_URL}
              >
                {t("home.highlight.button")}
              </a>
            </div>
          </Col>
          <Col
            lg={{ span: 6, order: 2 }}
            xs={{ order: 1 }}
            className="text-center mb-4 mb-md-0"
          >
            <img
              src={image2}
              alt={t("home.highlight.alt")}
              width="100%"
              className="margin-top-4 mt-lg-0"
            />
          </Col>
        </Row>
        <hr />
        <div className="projects-heading">
          <label className="label mb-3">{t("common.projects")}</label>
          <h2 className="heading mb-3">{t("home.projects.subtitle")}</h2>
          <p>{t("home.projects.description")}</p>
        </div>
      </Container>
      <Projects />
    </main>
  );
};

export default Home;
