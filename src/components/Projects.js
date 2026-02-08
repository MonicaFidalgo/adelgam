import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import image1 from "../assets/project1.png";
import image2 from "../assets/project2.png";
import image3 from "../assets/project3.png";
import image4 from "../assets/project4.png";
import { Link } from "react-router-dom";

const Projects = () => {
  const { t } = useTranslation();
  const projectData = [
    {
      id: 1,
      name: "Portas do Tejo",
      image: image4,
      link: "portas-do-tejo",
      location: "Montijo",
      apartments: "projects_list.portas_do_tejo.apartments",
      typologies: "projects_list.portas_do_tejo.typologies",
      parking: "projects_list.portas_do_tejo.parking",
      badge: "projects_list.portas_do_tejo.badge",
      badgeClass: "badge-green",
      isApartment: true,
    },
    {
      id: 2,
      name: "Moradias São Francisco",
      image: image3,
      link: "moradias",
      location: "São Francisco",
      apartments: "projects_list.moradias_sao_francisco.apartments",
      typologies: "projects_list.moradias_sao_francisco.typologies",
      parking: "projects_list.moradias_sao_francisco.parking",
      badge: "projects_list.moradias_sao_francisco.badge",
      badgeClass: "badge-green",
      isApartment: false,
    },

    {
      id: 3,
      name: "Lux Terrace Alcochete",
      image: image1,
      link: "lux-terrace",
      location: "Alcochete",
      apartments: "projects_list.lux_terrace.apartments",
      typologies: "projects_list.lux_terrace.typologies",
      parking: "projects_list.lux_terrace.parking",
      badge: "projects_list.lux_terrace.badge",
      badgeClass: "badge-yellow",
      isApartment: true,
    },
    {
      id: 4,
      name: "Varandas do Montijo",
      image: image2,
      link: "varandas-do-montijo",
      location: "Montijo",
      apartments: "projects_list.varandas_do_montijo.apartments",
      typologies: "projects_list.varandas_do_montijo.typologies",
      parking: "projects_list.varandas_do_montijo.parking",
      badge: "projects_list.varandas_do_montijo.badge",
      badgeClass: "badge-red",
      isApartment: true,
    },
  ];

  return (
    <>
      <Row className="my-60">
        {projectData.slice(0, 2).map((project) => (
          <Col lg={6} key={project.id}>
            <div className="project">
              <Link to={`/empreendimentos/${project.link}`}>
                <img src={project.image} alt={project.name} />
              </Link>

              <div>
                {" "}
                <h5>{project.name}</h5>
                <label className={`badge ${project.badgeClass}`}>
                  <span className="badge-circle"></span>
                  {t(project.badge)}
                </label>
                <ul>
                  <li>
                    <span>{t("common.location")}:</span>
                    <strong>{project.location}</strong>
                  </li>
                  <li>
                    <span>
                      {project.isApartment
                        ? t("common.apartments")
                        : t("common.moradias")}
                      :
                    </span>
                    <strong>{t(project.apartments)}</strong>
                  </li>
                  <li>
                    <span>{t("common.tipologias")}:</span>
                    <strong>{t(project.typologies)}</strong>
                  </li>
                  <li>
                    <span>{t("common.parking")}: </span>
                    <strong>{t(project.parking)}</strong>
                  </li>
                </ul>
                <Link
                  to={`/empreendimentos/${project.link}`}
                  className="button button-primary"
                >
                  {t("common.more_details")}
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="my-60">
        {projectData.slice(2).map((project) => (
          <Col lg={6} key={project.id}>
            <div className="project">
              <Link to={`/empreendimentos/${project.link}`}>
                <img src={project.image} alt={project.name} />
              </Link>

              <div>
                {" "}
                <h5>{project.name}</h5>
                <label className={`badge ${project.badgeClass}`}>
                  <span className="badge-circle"></span>
                  {t(project.badge)}
                </label>
                <ul>
                  <li>
                    <span>{t("common.location")}:</span>
                    <strong>{project.location}</strong>
                  </li>
                  <li>
                    <span>
                      {project.isApartment
                        ? t("common.apartments")
                        : t("common.moradias")}
                      :
                    </span>
                    <strong>{t(project.apartments)}</strong>
                  </li>
                  <li>
                    <span>{t("common.tipologias")}:</span>
                    <strong>{t(project.typologies)}</strong>
                  </li>
                  <li>
                    <span>{t("common.parking")}: </span>
                    <strong>{t(project.parking)}</strong>
                  </li>
                </ul>
                <Link
                  to={`/empreendimentos/${project.link}`}
                  className="button button-primary"
                >
                  {t("common.more_details")}
                </Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Projects;
