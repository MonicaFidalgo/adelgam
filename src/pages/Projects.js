import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectComponent from "../components/Projects";
import image2 from "../assets/image-2.png";

const Projects = () => {
  return (
    <Container className="pt-200">
      <div className="banner-heading">
        <label className="label mb-4">Empreendimento em Curso</label>
        <h2 className="heading-big">
          Explore os nossos projetos e descubra como transformamos visões em
          realidade.
        </h2>
      </div>
      <Row className="py-100">
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

      <ProjectComponent />
    </Container>
  );
};

export default Projects;
