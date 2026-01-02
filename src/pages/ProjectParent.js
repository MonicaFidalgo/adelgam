import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects.json";
import Higlights from "../components/Highlights";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import DetailsIcons from "../components/DetailsIcons";
import ImageGallery from "../components/ImageZoom";
import Table from "react-bootstrap/Table";

const ProjectParent = () => {
  const { t } = useTranslation();
  const { projectTitle } = useParams();
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const toggleCollapse = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

  const {
    title,
    images,
    description,
    projects,
    badgeClass,
    badge,
    location,
    state,
    typology,
  } = projectData;

  return (
    <Container className="pt-200">
      <div className="banner-heading">
        <label className="label mb-4">Empreendimento</label>
        <h2 className="heading-big mb-3">{t(title)}</h2>
        <label className={`badge ${badgeClass} mb-3`}>
          <span className="badge-circle"></span>
          {badge}
        </label>
        {!!description && (
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: t(description) }}
          />
        )}
        {!!projectData.price && (
          <>
            {" "}
            <p className="price mb-3">{projectData.price} €</p>{" "}
            <a
              href="mailto:adelgam@adelgam.pt"
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              Quero marcar uma visita
            </a>
          </>
        )}
      </div>
      {!!images && images?.length > 0 ? (
        <>
          <hr className="mt-60" />
          <Higlights location={location} state={state} typology={typology} />
          <hr className="mb-60" />

          <ImageCarousel images={images} onImageClick={handleImageClick} />
          <ImageModal
            isOpen={selectedImageIndex !== null}
            imageUrl={
              selectedImageIndex !== null
                ? require(`../assets/${images[selectedImageIndex]}`)
                : ""
            }
            onClose={handleCloseModal}
          />
        </>
      ) : (
        <h4 className="text-center">🚧 Página em construção 🚧 </h4>
      )}

      {/* ONLY FOR MORADIAS*/}
      {!!projectData?.details && <DetailsIcons data={projectData.details} />}

      {!!projectData?.description2 && (
        <div
          className="deluxe-description"
          dangerouslySetInnerHTML={{ __html: t(projectData?.description2) }}
        />
      )}

      {!!projectData?.details2 && <DetailsIcons data={projectData.details2} />}

      {projectData?.detailsDescription && (
        <div className="acabamentos project-details-list">
          <div className="project-details-list-title">Pontos Chave</div>
          <div className="project-details-list-description">
            <ul className="bullet-list">
              {projectData?.detailsDescription.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {!!projectData?.detailsPlants && (
              <div className="project-details-list-images-wrapper d-none d-md-flex">
                <ImageGallery images={projectData?.detailsPlants} />
              </div>
            )}
          </div>
        </div>
      )}

      {!!projectData?.detailsPlants && (
        <div className="plantas project-details-list d-md-none">
          <div className="project-details-list-title">Plantas</div>

          <ImageGallery images={projectData?.detailsPlants} />
        </div>
      )}

      {/* END OF ONLY FOR MORADIAS*/}

      {!!projects && projects.length > 0 && (
        <h3 className="heading my-60 text-center">Apartamentos T1 - T3</h3>
      )}
      {!!projects && projects.length > 0 && (
        <div className="d-none d-lg-block">
          <Table>
            <thead>
              <tr>
                <th>TIPOLOGIA</th>
                <th>ÁREA</th>
                <th>QUARTOS</th>
                <th>WC</th>
                <th>ESTACIONAMENTO</th>
                <th>PREÇO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((project, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex flex-column">
                      <strong>{t(project.name)}</strong>
                      <label className={`badge ${project.badgeClass} mt-1`}>
                        <span className="badge-circle"></span>
                        {project.badge}
                      </label>
                    </div>
                  </td>
                  <td>{project.details.area || "N/A"}m²</td>
                  <td>{project.details.bedrooms || "N/A"}</td>
                  <td>{project.details.bathrooms || "N/A"}</td>
                  <td>{project.details.parking || "N/A"}</td>
                  <td>{project.price ? `${project.price}€` : "N/A"}</td>
                  <td>
                    <Link
                      to={`/empreendimentos/${projectTitle}/${project.link}`}
                      className="button button-primary"
                    >
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {/* Mobile View: projects */}
      <div className="d-lg-none">
        {projects?.map((project, index) => (
          <div key={index} className="card-component mb-3">
            {/* Collapse Button */}
            <div className="card-component-header">
              <button
                className="btn w-100 text-start"
                onClick={() => toggleCollapse(`project-${index}`)}
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-project-${index}`}
                aria-expanded={openIndex === `project-${index}`}
              >
                <div className="d-flex justify-content-between">
                  <span>{t(project.name)} </span>
                  <span> {openIndex === `project-${index}` ? "−" : "+"}</span>
                </div>
              </button>
            </div>

            {/* Collapsible Content */}
            <div
              id={`collapse-project-${index}`}
              className={`collapse ${
                openIndex === `project-${index}` ? "show" : ""
              }`}
            >
              <div className="card-component-body">
                <div className="d-flex flex-column">
                  <label className={`badge ${project.badgeClass} mb-3`}>
                    <span className="badge-circle"></span>
                    {project.badge}
                  </label>
                </div>
                <p>
                  <strong>Área:</strong> {project.details.area || "N/A"}m²
                </p>
                <p>
                  <strong>Quartos:</strong> {project.details.bedrooms || "N/A"}
                </p>
                <p>
                  <strong>WC:</strong> {project.details.bathrooms || "N/A"}
                </p>
                <p>
                  <strong>Estacionamento:</strong>{" "}
                  {project.details.parking || "N/A"}
                </p>
                <p>
                  <strong>Preço:</strong>{" "}
                  {project.price ? `${project.price}€` : "N/A"}
                </p>

                <Link
                  className="button button-primary"
                  to={`/empreendimentos/${projectTitle}/${project.link}`}
                >
                  Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!!projectData?.penthouses && (
        <h3 className="heading my-60 text-center">Penthouses</h3>
      )}
      {!!projectData?.penthouses && (
        <div className="d-none d-lg-block">
          <Table>
            <thead>
              <tr>
                <th>TIPOLOGIA</th>
                <th>ÁREA</th>
                <th>QUARTOS</th>
                <th>WC</th>
                <th>BOXES</th>
                <th>PREÇO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projectData?.penthouses?.map((project, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex flex-column">
                      <strong>{t(project.name)}</strong>
                      <label className={`badge ${project.badgeClass} mt-1`}>
                        <span className="badge-circle"></span>
                        {project.badge}
                      </label>
                    </div>
                  </td>
                  <td>{project.details.area || "N/A"}m²</td>
                  <td>{project.details.bedrooms || "N/A"}</td>
                  <td>{project.details.bathrooms || "N/A"}</td>
                  <td>{project.details.parking || "N/A"}</td>
                  <td>{project.price ? `${project.price}€` : "N/A"}</td>
                  <td>
                    <Link
                      className="button button-primary"
                      to={`/empreendimentos/${projectTitle}/${project.link}`}
                    >
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {/* Mobile View: penthouses */}
      <div className="d-lg-none">
        {projectData?.penthouses?.map((project, index) => (
          <div key={index} className="card-component mb-3">
            {/* Collapse Button */}
            <div className="card-component-header">
              <button
                className="btn w-100 text-start"
                onClick={() => toggleCollapse(`penthouse-${index}`)}
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-penthouse-${index}`}
                aria-expanded={openIndex === `penthouse-${index}`}
              >
                <div className="d-flex justify-content-between">
                  <span>{t(project.name)} </span>
                  <span>{openIndex === `penthouse-${index}` ? "−" : "+"}</span>
                </div>
              </button>
            </div>

            {/* Collapsible Content */}
            <div
              id={`collapse-penthouse-${index}`}
              className={`collapse ${
                openIndex === `penthouse-${index}` ? "show" : ""
              }`}
            >
              <div className="card-component-body">
                <div className="d-flex flex-column">
                  <label className={`badge ${project.badgeClass} mb-3`}>
                    <span className="badge-circle"></span>
                    {project.badge}
                  </label>
                </div>
                <p>
                  <strong>Área:</strong> {project.details.area || "N/A"}m²
                </p>
                <p>
                  <strong>Quartos:</strong> {project.details.bedrooms || "N/A"}
                </p>
                <p>
                  <strong>WC:</strong> {project.details.bathrooms || "N/A"}
                </p>
                <p>
                  <strong>Estacionamento:</strong>{" "}
                  {project.details.parking || "N/A"}
                </p>
                <p>
                  <strong>Preço:</strong>{" "}
                  {project.price ? `${project.price}€` : "N/A"}
                </p>

                <Link
                  className="button button-primary"
                  to={`/empreendimentos/${projectTitle}/${project.link}`}
                >
                  Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ProjectParent;
