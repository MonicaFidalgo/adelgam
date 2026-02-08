import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ProjectComponent from "../components/Projects";

const Projects = () => {
  const { t } = useTranslation();
  return (
    <Container className="pt-200">
      <div className="banner-heading mb-4">
        <label className="label mb-4">{t("common.buildings")}</label>
        <h2 className="heading-big">{t("home.projects.subtitle")}</h2>
        <p className="mt-3 mb-3">{t("home.projects.description")}</p>
      </div>

      <ProjectComponent />
    </Container>
  );
};

export default Projects;
