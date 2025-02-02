import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects.json";

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { projectTitle, projectDetailName } = useParams();

  // Get the projects for the specific projectTitle
  const projectData = projectsData[projectTitle];

  // Find the specific project detail
  const project =
    projectData &&
    projectData.projects.find((p) => p.link === projectDetailName);

  if (!project) {
    return <h2>Product not found</h2>;
  }

  const imagePath = require(`../assets/${project.image}`);

  return (
    <Container className="py-100">
      {!project ? (
        <>
          <h2>Project Detail not found</h2>
          <p>The project detail you are looking for does not exist.</p>
        </>
      ) : (
        <>
          <h1>{t(project.name)}</h1>
          <img
            src={imagePath}
            alt={t(project.name)}
            style={{ width: "300px" }}
          />
          <p>{t(project.description)}</p>
        </>
      )}
    </Container>
  );
};

export default ProjectDetail;
