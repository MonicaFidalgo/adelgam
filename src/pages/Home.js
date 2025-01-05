import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Details from "../components/Details";
import Numbers from "../components/Numbers";
import bannerImage from "../assets/adelgam-real-state.webp";
import details from "../data/details.json";
import numbers from "../data/numbers.json";

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
    </main>
  );
};

export default Home;
