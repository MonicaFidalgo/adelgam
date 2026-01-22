import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects2.json";
import Higlights from "../components/Highlights";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import Table from "react-bootstrap/Table";

const ProjectParent = () => {
  const { t } = useTranslation();
  const { projectTitle } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => {
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => {
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const toggleDropdown = (section, groupIndex) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [groupIndex]: !prev[section]?.[groupIndex],
      },
    }));
  };

  const projectData = projectsData[projectTitle];
  const isMoreInfoSoon = projectData?.isMoreInfoSoon;

  // Função para calcular badge dinâmico
  const calculateGroupBadge = (items) => {
    const total = items.length;

    // Conta quantos estão vendidos (badge contém "vendido")
    const sold = items.filter(
      (item) => item.badge && item.badge.toLowerCase().includes("vendido"),
    ).length;

    const available = total - sold;

    if (sold === total) {
      // Todos vendidos
      return { text: "100% vendido", class: "badge-red" };
    } else if (available === 1) {
      // Só 1 disponível
      return { text: "1 disponível", class: "badge-green" };
    } else {
      // Vários disponíveis
      return { text: `${available} disponíveis`, class: "badge-green" };
    }
  };

  if (!projectData) {
    return (
      <div className="container pt-200">
        <h1>Project not found</h1>
        <p>
          The project you are looking for does not exist.{" "}
          <Link to="/">Return to the home page</Link>.
        </p>
      </div>
    );
  }

  const {
    title,
    images,
    description,
    projects,
    projectGroups,
    penthouses,
    penthouseGroups,
    badgeClass,
    badge,
    location,
    state,
    typology,
  } = projectData;

  // Detecta qual estrutura usar
  const hasNewStructure = projectGroups && projectGroups.length > 0;
  const hasOldStructure = projects && projects.length > 0;
  const hasPenthousesNew = penthouseGroups && penthouseGroups.length > 0;
  const hasPenthousesOld = penthouses && penthouses.length > 0;

  return (
    <div className="container pt-200">
      {/* Banner Section */}
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
            <p className="price mb-3">{projectData.price} €</p>
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

      {/* Images Section */}
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
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
          />
        </>
      ) : (
        <h4 className="text-center">🚧 Página em construção 🚧</h4>
      )}

      {isMoreInfoSoon && (
        <h4 className="text-center text-2xl mt-5">Mais informações em breve</h4>
      )}

      {/* NOVA ESTRUTURA - Com grupos e dropdowns (Portas do Tejo) */}
      {hasNewStructure && (
        <div className="my-60">
          <h3 className="heading text-center mb-60">Apartamentos T1 - T3</h3>

          {/* Desktop View - Table com dropdowns */}
          <div className="d-none d-lg-block" style={{ overflowX: "auto" }}>
            <Table style={{ tableLayout: "fixed", width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>TIPOLOGIA</th>
                  <th style={{ width: "12%" }}>ÁREA</th>
                  <th style={{ width: "12%" }}>QUARTOS</th>
                  <th style={{ width: "10%" }}>WC</th>
                  <th style={{ width: "15%" }}>ESTACIONAMENTO</th>
                  <th style={{ width: "15%" }}>PREÇO</th>
                  <th style={{ width: "16%" }}></th>
                </tr>
              </thead>
              <tbody>
                {projectGroups.map((group, groupIndex) => {
                  const dynamicBadge = calculateGroupBadge(group.apartments);

                  return (
                    <>
                      {/* Group Header Row */}
                      <tr key={`group-${groupIndex}`}>
                        <td
                          colSpan="7"
                          style={{
                            padding: "0",
                            backgroundColor: "transparent",
                          }}
                        >
                          <button
                            onClick={() =>
                              toggleDropdown("projects", groupIndex)
                            }
                            className="w-100 text-start"
                            style={{
                              background: "rgba(189, 154, 104, 0.2)",
                              border: "none",
                              padding: "20px 40px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <strong
                                style={{ color: "#bd9a68", fontSize: "16px" }}
                              >
                                {t(group.typology)}
                              </strong>
                              <label
                                className={`badge ${dynamicBadge.class}`}
                                style={{ marginBottom: 0 }}
                              >
                                <span className="badge-circle"></span>
                                {dynamicBadge.text}
                              </label>
                            </div>
                            <span
                              style={{ fontSize: "20px", color: "#bd9a68" }}
                            >
                              {openDropdowns.projects?.[groupIndex] ? "−" : "+"}
                            </span>
                          </button>
                        </td>
                      </tr>

                      {/* Group Items */}
                      {openDropdowns.projects?.[groupIndex] &&
                        group.apartments.map((apartment, aptIndex) => (
                          <tr key={`apt-${groupIndex}-${aptIndex}`}>
                            <td>
                              <div className="d-flex flex-column">
                                <strong>{t(apartment.name)}</strong>
                                {apartment.badge && (
                                  <label
                                    className={`badge ${apartment.badgeClass} mt-1`}
                                    style={{ marginBottom: 0 }}
                                  >
                                    <span className="badge-circle"></span>
                                    {apartment.badge}
                                  </label>
                                )}
                              </div>
                            </td>
                            <td>{apartment.details.area || "N/A"}m²</td>
                            <td>{apartment.details.bedrooms || "N/A"}</td>
                            <td>{apartment.details.bathrooms || "N/A"}</td>
                            <td>{apartment.details.parking || "N/A"}</td>
                            <td>
                              {apartment.price ? `${apartment.price}€` : "N/A"}
                            </td>
                            <td>
                              {apartment.badge === "Vendido" ? (
                                <span
                                  className="button"
                                  style={{
                                    backgroundColor: "#999",
                                    color: "#fff",
                                    cursor: "not-allowed",
                                    opacity: 0.6,
                                  }}
                                >
                                  Vendido
                                </span>
                              ) : (
                                <Link
                                  to={`/empreendimentos/${projectTitle}/${apartment.link}`}
                                  className="button button-primary"
                                >
                                  Detalhes
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))}
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {/* Mobile View - Collapsible Cards */}
          <div className="d-lg-none">
            {projectGroups.map((group, groupIndex) => {
              const dynamicBadge = calculateGroupBadge(group.apartments);

              return (
                <div key={groupIndex} className="card-component mb-3">
                  <div className="card-component-header">
                    <button
                      className="btn w-100 text-start p-0"
                      onClick={() =>
                        toggleDropdown("projects-mobile", groupIndex)
                      }
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "inherit",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                          <strong>{t(group.typology)}</strong>
                          <label
                            className={`badge ${dynamicBadge.class}`}
                            style={{ marginBottom: 0 }}
                          >
                            <span className="badge-circle"></span>
                            {dynamicBadge.text}
                          </label>
                        </div>
                        <span style={{ fontSize: "20px" }}>
                          {openDropdowns["projects-mobile"]?.[groupIndex]
                            ? "−"
                            : "+"}
                        </span>
                      </div>
                    </button>
                  </div>

                  {openDropdowns["projects-mobile"]?.[groupIndex] && (
                    <div>
                      {group.apartments.map((apartment, aptIndex) => (
                        <div
                          key={aptIndex}
                          className="card-component-body"
                          style={{
                            borderTop:
                              aptIndex > 0
                                ? "1px solid rgba(189, 154, 104, 0.2)"
                                : "none",
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                              <strong style={{ fontSize: "16px" }}>
                                {t(apartment.name)}
                              </strong>
                              {apartment.badge && (
                                <div className="mt-2">
                                  <label
                                    className={`badge ${apartment.badgeClass}`}
                                    style={{ marginBottom: 0 }}
                                  >
                                    <span className="badge-circle"></span>
                                    {apartment.badge}
                                  </label>
                                </div>
                              )}
                            </div>
                            <div className="price" style={{ fontSize: "18px" }}>
                              {apartment.price ? `${apartment.price}€` : "N/A"}
                            </div>
                          </div>

                          <div
                            className="row mb-3"
                            style={{ fontSize: "14px" }}
                          >
                            <div className="col-6 mb-2">
                              <span style={{ color: "#797978" }}>Área:</span>
                              <strong className="ms-1">
                                {apartment.details.area || "N/A"}m²
                              </strong>
                            </div>
                            <div className="col-6 mb-2">
                              <span style={{ color: "#797978" }}>Quartos:</span>
                              <strong className="ms-1">
                                {apartment.details.bedrooms || "N/A"}
                              </strong>
                            </div>
                            <div className="col-6 mb-2">
                              <span style={{ color: "#797978" }}>WC:</span>
                              <strong className="ms-1">
                                {apartment.details.bathrooms || "N/A"}
                              </strong>
                            </div>
                            <div className="col-6 mb-2">
                              <span style={{ color: "#797978" }}>
                                Estacion.:
                              </span>
                              <strong className="ms-1">
                                {apartment.details.parking || "N/A"}
                              </strong>
                            </div>
                          </div>

                          {apartment.badge === "Vendido" ? (
                            <button
                              disabled
                              className="button w-100"
                              style={{
                                backgroundColor: "#999",
                                color: "#fff",
                                cursor: "not-allowed",
                                opacity: 0.6,
                              }}
                            >
                              Vendido
                            </button>
                          ) : (
                            <Link
                              to={`/empreendimentos/${projectTitle}/${apartment.link}`}
                              className="button button-primary w-100"
                            >
                              Ver Detalhes
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ESTRUTURA ANTIGA - Tabela simples sem collapse (Lux Terrace, etc) */}
      {hasOldStructure && !hasNewStructure && (
        <>
          <h3 className="heading my-60 text-center">Apartamentos T1 - T3</h3>

          {/* Desktop View */}
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
                {projects.map((project, index) => (
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

          {/* Mobile View */}
          <div className="d-lg-none">
            {projects.map((project, index) => (
              <div key={index} className="card-component mb-3">
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
                    <strong>Quartos:</strong>{" "}
                    {project.details.bedrooms || "N/A"}
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
            ))}
          </div>
        </>
      )}

      {/* PENTHOUSES - Estrutura antiga (simples) */}
      {hasPenthousesOld && !hasPenthousesNew && (
        <>
          <h3 className="heading my-60 text-center">Penthouses</h3>

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
                {penthouses.map((project, index) => (
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

          <div className="d-lg-none">
            {penthouses.map((project, index) => (
              <div key={index} className="card-component mb-3">
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
                    <strong>Quartos:</strong>{" "}
                    {project.details.bedrooms || "N/A"}
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
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectParent;
