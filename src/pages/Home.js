import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Details from "../components/Details";
import Numbers from "../components/Numbers";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import bannerImage from "../assets/adelgam-real-state.webp";
import details from "../data/details.json";
import numbers from "../data/numbers.json";
import image1 from "../assets/image-1.png";
import image2 from "../assets/image-2.png";

const Home = () => {
  return (
    <main>
      <Container fluid>
        <Row>
          <Col lg={6} className="d-flex flex-column justify-content-center">
            <div className="banner-content">
              <label className="label mb-4">Porquê a Adelgam?</label>
              <h1 className="banner-title mb-4">Deluxe Penthouse</h1>
              <h2 className="banner-subtitle mb-4">
                Nas margens serenas de Alcochete, com vista panorâmica para a
                icónica Lisboa, ergue-se uma joia arquitectónica que redefine o
                luxo e o requinte.
              </h2>
              <button className="button button-primary">
                Mais informações
              </button>
            </div>
          </Col>
          <Col lg={6} className="px-0">
            <img src={bannerImage} alt="planeamento" width="100%" />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Numbers data={numbers} />
        </Row>
        <Row>
          <hr />
          <Details data={details} />
          <hr />
        </Row>
      </Container>
      <Container>
        <Row className="mx-60">
          <Col lg={6} className="text-center">
            <img src={image1} alt="sala e cozinha" width="100%" />
          </Col>
          <Col lg={6} className="align-self-center">
            <div>
              <label className="label mb-4">PORQUÊ A ADELGAM?</label>
              <h2 className="heading mb-4">
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
              <button className="button button-primary mt-4">
                Conheça a Adelgam
              </button>
            </div>
          </Col>
        </Row>
        <hr />
      </Container>
      <Container>
        <Row className="mx-60">
          <Col lg={6} className="align-self-center">
            <div>
              <label className="label mb-4">PROJECTO EM DESTAQUE</label>
              <h2 className="heading mb-4">Passeio das Caravelas</h2>
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
                  Tipologias: <strong>T2 a T3 Penthouse</strong>
                </li>
                <li>
                  Estacionamento: <strong>Box (Para 2 carros)</strong>
                </li>
              </ul>
              <button className="button button-primary mt-4">
                Mais informações
              </button>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <img src={image2} alt="sala e cozinha" width="100%" />
          </Col>
        </Row>
        <hr />
        <Projects />
      </Container>
      <Footer />
    </main>
  );
};

export default Home;
