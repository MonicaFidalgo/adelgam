import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Details from "../components/Details";
import Projects from "../components/Projects";
import bannerImage from "../assets/adelgam-real-state.webp";
import details from "../data/details.json";
import image1 from "../assets/image-1.png";
import image2 from "../assets/image-3.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
              <Link
                className="button button-primary"
                to="/empreendimentos/portas-do-tejo"
              >
                {t("home.banner.button")}
              </Link>
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

          <Link
            className="button button-primary"
            to="/empreendimentos/portas-do-tejo"
          >
            {t("home.banner.button")}
          </Link>
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
              <label className="label mb-3">PROJECTO EM DESTAQUE</label>
              <h2 className="heading mb-3">{t("common.moradia")}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("home.highlight.description"),
                }}
              />

              <Link
                className="button button-primary margin-top-4"
                to="/empreendimentos/moradias"
              >
                {t("common.more_details")}
              </Link>
            </div>
          </Col>
          <Col
            lg={{ span: 6, order: 2 }}
            xs={{ order: 1 }}
            className="text-center mb-4 mb-md-0"
          >
            <img
              src={image2}
              alt="sala e cozinha"
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
        <Projects />
      </Container>
    </main>
  );
};

export default Home;
