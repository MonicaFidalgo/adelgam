import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../components/Carousel";
import projectsData from "../data/projects.json";

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { projectTitle, projectDetailName } = useParams();

  const projectData = projectsData[projectTitle];

  const project =
    projectData.projects?.find((p) => p.link === projectDetailName) ||
    projectData.penthouses?.find((p) => p.link === projectDetailName);

  return (
    <Container className="pt-200">
      {!project ? (
        <>
          <h2>Project Detail not found</h2>
          <p>The project detail you are looking for does not exist.</p>
        </>
      ) : (
        <>
          <div className="banner-heading mb-60">
            <label className="label mb-3">{project.label}</label>
            <h2 className="heading-big mb-3">Projecto {t(project.name)}</h2>
            <label className={`badge ${project.badgeClass} mb-3`}>
              <span className="badge-circle"></span>
              {project.badge}
            </label>
            <p className="mb-3">{t(project.description)}</p>
            <p className="price mb-3">{project.price} €</p>
            <a
              href="mailto:adelgam@adelgam.pt"
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              Quero marcar uma visita
            </a>
          </div>

          <ImageCarousel images={project.images} />

          <div className="project-details-list">
            <div className="project-details-list-title">Características</div>
            <div className="project-details-list-description">
              <ul>
                <li>
                  <span>Quartos:</span>
                  <strong>{project.details.bedrooms}</strong>
                </li>
                <li>
                  <span>WC:</span>
                  <strong>{project.details.bathrooms}</strong>
                </li>
                <li>
                  <span>Estacionamento:</span>
                  <strong>{project.details.parking}</strong>
                </li>
                <li>
                  <span>Área: </span>
                  <strong>{project.details.area} m²</strong>
                </li>
                <li>
                  <span>Certificação Energética: </span>
                  <strong>{project.details.certification}</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="project-details-list">
            <div className="project-details-list-title">
              Acabamentos/ Destaques
            </div>
            <div className="project-details-list-description">
              <ul className="bullet-list">
                {project?.details?.description.map((item, index) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="project-details-list">
            <div className="project-details-list-title">Plantas</div>
            <div className="project-details-list-images">
              {project?.details?.plants.map((item, index) => {
                const projectImagePath = require(`../assets/${item.image}`);

                return (
                  <div key={index}>
                    <img src={projectImagePath} alt="plants" maxWidth="400px" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default ProjectDetail;
