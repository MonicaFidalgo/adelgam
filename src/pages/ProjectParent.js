import React from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import projectsData from "../data/projects.json";

const ProjectParent = () => {
  const { projectTitle } = useParams();

  const projectData = projectsData[projectTitle];

  if (!projectData) {
    return (
      <Container className="py-100">
        <h1>Project not found</h1>
        <p>
          The project you are looking for does not exist.{" "}
          <Link to="/">Return to the home page</Link>.
        </p>
      </Container>
    );
  }

  const { title, image, description, projects } = projectData;

  const imagePath = require(`../assets/${image}`);

  return (
    <Container className="py-100">
      <h1>Projecto {title}</h1>
      <p>{description}</p>
      <img src={imagePath} alt={title} />
      {projects.length > 0 ? (
        <ul>
          {projects.map((product, index) => {
            const projectImagePath = require(`../assets/${product.image}`);
            return (
              <li key={index}>
                <Link to={`/empreendimentos/${projectTitle}/${product.link}`}>
                  <h2>{product.name}</h2>
                  <img
                    src={projectImagePath}
                    alt={product.name}
                    style={{ width: "150px" }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No projects are currently available for this category.</p>
      )}
    </Container>
  );
};

export default ProjectParent;
