import React from "react";
import { Container } from "react-bootstrap";
import ProjectComponent from "../components/Projects";

const Projects = () => {
  return (
    <Container className="pt-200">
      <div className="banner-heading mb-4">
        <label className="label mb-4">Empreendimentos</label>
        <h2 className="heading-big">Espaços de conforto e harmonia</h2>
        <p>
          Na Adelgam, temos o orgulho de ter entregue inúmeras chaves a novos
          proprietários satisfeitos. Cada projecto que realizamos reflecte o
          nosso compromisso com a qualidade, a inovação e o bem-estar das
          famílias.
        </p>
      </div>
      {/* <Row className="py-100">
        <Col lg={6} className="text-center">
          <img src={image2} alt="sala e cozinha" width="100%" />
        </Col>
        <Col lg={6} className="align-self-center">
          <div>
            <label className="label mb-4">Projecto em destaque</label>
            <h2 className="heading mb-4">Passeio das Caravelas</h2>
            <label className="badge badge-green mb-3">Novo lançamento</label>
            <p>
              <strong>Adelgam Promoção Imobiliária</strong> é uma empresa que
              centra a sua atividade na área da Construção Civil e Promoção
              Imobiliária, a atuar no mercado há mais de 25 anos.
            </p>
            <ul>
              <li>
                <span>Localização:</span> <strong>Alcochete</strong>
              </li>
              <li>
                <span> Apartamentos: </span>
                <strong>37 apartamentos e 5 penthouses</strong>
              </li>
              <li>
                <span>Tipologias:</span>
                <strong>T2 a T3 Penthouse</strong>
              </li>
              <li>
                <span>Estacionamento:</span>{" "}
                <strong>Box (para 2 carros)</strong>
              </li>
            </ul>
          </div>
        </Col>
      </Row> */}

      <ProjectComponent />
    </Container>
  );
};

export default Projects;
