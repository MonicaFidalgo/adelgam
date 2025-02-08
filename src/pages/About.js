import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Numbers from "../components/Numbers";
import GoogleMap from "../components/Map";
import numbers from "../data/numbers.json";
import image2 from "../assets/image-2.png";

const About = () => {
  return (
    <div>
      <Container className="pt-200 ">
        <div className="banner-heading mb-4">
          <label className="label mb-4">Conheça a Adelgam</label>
          <h2 className="heading-big">
            Há mais de 25 anos, a construir com qualidade e inovação.
          </h2>
        </div>
        <hr />
        <Numbers data={numbers} />
        <hr />
        <Row className="my-60">
          <Col lg={6} className="align-self-center">
            <div>
              <label className="label mb-4">Sobre Nós</label>
              <h2 className="heading mb-4">A nossa história e compromisso</h2>
              <p>
                <strong>Adelgam Promoção Imobiliária</strong> é uma empresa que
                centra a sua atividade na área da Construção Civil e Promoção
                Imobiliária, a atuar no mercado há mais de 25 anos.
              </p>
              <p>
                Procuramos sempre diferenciar-nos na qualidade e inovação
                durante toda a construção assegurando acabamentos requintados e
                diferenciadores.s
              </p>
              <p>
                Ao longo dos anos, a Adelgam acompanhou as técnicas de
                construção e os estudos dos novos materiais a colocar, com o
                intuito de efetuar sempre um trabalho de referência.
              </p>
              <p>
                Contamos sempre com a ajuda de bons profissionais tornando a
                Adelgam uma empresa credível e reconhecida no mercado.
              </p>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <img src={image2} alt="sala e cozinha" width="100%" />
          </Col>
        </Row>
        <hr />
        <div className="contacts-map">
          <label className="label mb-4">Onde Estamos?</label>
          <h2 className="heading-big">Venha visitar-nos</h2>
        </div>

        <GoogleMap location="Lux Terrace Alcochete" width="100%" height="400" />
      </Container>
    </div>
  );
};
export default About;
