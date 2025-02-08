import React from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects.json";
import Higlights from "../components/Highlights";
import ImageCarousel from "../components/Carousel";
import Table from "react-bootstrap/Table";

const ProjectParent = () => {
  const { t } = useTranslation();
  const { projectTitle } = useParams();

  const projectData = projectsData[projectTitle];

  if (!projectData) {
    return (
      <Container className="pt-200">
        <h1>Project not found</h1>
        <p>
          The project you are looking for does not exist.{" "}
          <Link to="/">Return to the home page</Link>.
        </p>
      </Container>
    );
  }

  const { title, images, description, projects, badgeClass, badge } =
    projectData;

  return (
    <Container className="pt-200">
      <div className="banner-heading">
        <label className="label mb-4">Empreendimento</label>
        <h2 className="heading-big mb-3">{t(title)}</h2>
        <label className={`badge ${badgeClass} mb-3`}>{badge}</label>
        <p>{t(description)}</p>
      </div>

      <hr className="mt-60" />

      <Higlights />

      <hr className="mb-60" />

      <ImageCarousel images={images} />
      {!!projects && projects.length > 0 && (
        <>
          <h3 className="heading my-60 text-center">Apartamentos</h3>

          <Table>
            <thead>
              <tr>
                <th>TIPOLOGIA</th>
                <th>ÁREA</th>
                <th>QUARTOS</th>
                <th>CASA DE BANHO</th>
                <th>ESTACIONAMENTO</th>
                <th>PREÇO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((project, index) => (
                <tr key={index}>
                  <td>
                    <strong>{t(project.name)}</strong>
                  </td>
                  <td>{project.area || "N/A"}</td>
                  <td>{project.rooms || "N/A"}</td>
                  <td>{project.bathrooms || "N/A"} WC</td>
                  <td>{project.parking || "N/A"}</td>
                  <td>{project.price ? `${project.price}€` : "N/A"}</td>
                  <td>
                    <Link
                      to={`/empreendimentos/${projectTitle}/${project.link}`}
                      className="button button-primary"
                    >
                      Ver mais detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {!!projectData?.penthouses && (
        <>
          <h3 className="heading my-60 text-center">Penthouses</h3>

          <Table>
            <thead>
              <tr>
                <th>TIPOLOGIA</th>
                <th>ÁREA</th>
                <th>QUARTOS</th>
                <th>CASA DE BANHO</th>
                <th>ESTACIONAMENTO</th>
                <th>PREÇO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projectData?.penthouses?.map((project, index) => (
                <tr key={index}>
                  <td>
                    <strong>{t(project.name)}</strong>
                  </td>
                  <td>{project.area || "N/A"}</td>
                  <td>{project.rooms || "N/A"}</td>
                  <td>{project.bathrooms || "N/A"} WC</td>
                  <td>{project.parking || "N/A"}</td>
                  <td>{project.price ? `${project.price}€` : "N/A"}</td>
                  <td>
                    <Link
                      className="button button-primary"
                      to={`/empreendimentos/${projectTitle}/${project.link}`}
                    >
                      Ver mais detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default ProjectParent;
