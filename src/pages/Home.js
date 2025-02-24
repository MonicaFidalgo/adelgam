import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Details from "../components/Details";
import Projects from "../components/Projects";
import bannerImage from "../assets/adelgam-real-state.webp";
import details from "../data/details.json";
import image1 from "../assets/image-1.png";
import image2 from "../assets/image-2.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Container fluid>
        <Row className="d-none d-lg-flex">
          <Col lg={6} className="d-flex flex-column justify-content-center">
            <div className="banner-content">
              <label className="label mb-3"> {t("home.banner.label")}</label>
              <h1 className="banner-title mb-3">Deluxe Penthouse</h1>
              <h2 className="banner-subtitle mb-3">
                {t("home.banner.description")}
              </h2>
              <Link
                className="button button-primary"
                to="/empreendimentos/lux-terrace/penthouse-deluxe"
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
          <h1 className="banner-title mb-3">Deluxe Penthouse</h1>
          <h2 className="banner-subtitle mb-3">
            {t("home.banner.description")}
          </h2>

          <Link
            className="button button-primary"
            to="/empreendimentos/lux-terrace/penthouse-deluxe"
          >
            {t("home.banner.button")}
          </Link>
        </div>
      </div>

      <Container>
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
              <label className="label mb-3">PORQUÊ A ADELGAM?</label>
              <h2 className="heading mb-3">
                Oferecemos o mais alto nível de especialização, serviço e
                integridade.
              </h2>
              <p>
                Ao longo dos anos, a Adelgam acompanhou as técnicas de
                construção e os estudos dos novos materiais a colocar, com o
                intuito de efetuar sempre um trabalho de referência.
              </p>
              <p>
                Procuramos sempre diferenciar-nos na qualidade e inovação
                durante toda a construção assegurando acabamentos requintados e
                diferenciadores.
              </p>

              <Link className="button button-primary mt-4" to="/sobre">
                Conheça a Adelgam
              </Link>
            </div>
          </Col>
        </Row>
        <hr />
      </Container>
      <Container>
        <Row className="my-60">
          <Col lg={6} className="align-self-center">
            <div>
              <label className="label mb-3">PROJECTO EM DESTAQUE</label>
              <h2 className="heading mb-3">Lux Terrace</h2>
              <p>
                Numa arquitectura de linhas contemporâneas, pensada para as
                famílias modernas, as suas áreas generosas proporcionam o máximo
                conforto e são adequadas a qualquer estilo de vida.
              </p>
              <ul>
                <li>
                  Localização: <strong>Alcochete</strong>
                </li>
                <li>
                  Apartamentos: <strong>37 apartamentos e 5 penthouses</strong>
                </li>
                <li>
                  Tipologias: <strong>T1 a T4 Penthouse</strong>
                </li>
                <li>
                  Estacionamento: <strong>Box (Para 2 carros)</strong>
                </li>
              </ul>
              <Link
                className="button button-primary mt-4"
                to="/empreendimentos/lux-terrace"
              >
                Mais informações
              </Link>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <img
              src={image2}
              alt="sala e cozinha"
              width="100%"
              className="mt-4 mt-md-0"
            />
          </Col>
        </Row>
        <hr />
        <div className="projects-heading">
          <label className="label mb-3">Projectos Concluídos</label>
          <h2 className="heading mb-3">Espaços de conforto e harmonia</h2>
          <p>
            Na Adelgam, temos o orgulho de ter entregue inúmeras chaves a novos
            proprietários satisfeitos. Cada projecto que realizamos reflecte o
            nosso compromisso com a qualidade, a inovação e o bem-estar das
            famílias.
          </p>
        </div>
        <Projects />
      </Container>
    </main>
  );
};

export default Home;
