import React from "react";
import { Container } from "react-bootstrap";
import ProjectComponent from "../components/Projects";

const Projects = () => {
  return (
    <Container className="py-100">
      <h1>Projectos</h1>
      <ProjectComponent />
    </Container>
  );
};

export default Projects;
