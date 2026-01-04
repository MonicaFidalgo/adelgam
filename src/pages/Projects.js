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

      <ProjectComponent />
    </Container>
  );
};

export default Projects;
