import React from "react";
import { Row, Col } from "react-bootstrap";
import image1 from "../assets/project1.png";
import image2 from "../assets/project2.png";
import image3 from "../assets/project3.png";
import { Link } from "react-router-dom";

const Projects = () => {
  const projectData = [
    {
      id: 1,
      name: "Lux Terrace",
      image: image1,
      link: "lux-terrace",
      location: "Alcochete",
      apartments: "37 apartamentos e 5 penthouses",
      typologies: "T2 a T3 Penthouse",
      parking: "Box (Para 2 carros)",
      badge: "90% vendido",
      badgeClass: "badge-yellow",
    },
    {
      id: 2,
      name: "Varandas do Montijo",
      image: image2,
      link: "varandas-do-montijo",
      location: "Alcochete",
      apartments: "37 apartamentos e 5 penthouses",
      typologies: "T2 a T3 Penthouse",
      parking: "Box (Para 2 carros)",
      badge: "100% vendido",
      badgeClass: "badge-red",
    },
    {
      id: 3,
      name: "Moradias São Francisco",
      image: image3,
      link: "moradias-sao-francisco",
      location: "Alcochete",
      apartments: "37 apartamentos e 5 penthouses",
      typologies: "T2 a T3 Penthouse",
      parking: "Box (Para 2 carros)",
      badge: "100% vendido",
      badgeClass: "badge-red",
    },
  ];

  return (
    <>
      <Row className="mx-60">
        {projectData.map((project) => (
          <Col lg={4} key={project.id}>
            <div className="project">
              <img src={project.image} alt={project.name} />
              <h5>{project.name}</h5>
              <label className={`badge ${project.badgeClass}`}>
                {project.badge}
              </label>
              <ul>
                <li>
                  Localização: <strong>{project.location}</strong>
                </li>
                <li>
                  Apartamentos: <strong>{project.apartments}</strong>
                </li>
                <li>
                  Tipologias: <strong>{project.typologies}</strong>
                </li>
                <li>
                  Estacionamento: <strong>{project.parking}</strong>
                </li>
              </ul>
              <Link
                to={`/empreendimentos/${project.link}`}
                className="button button-primary"
              >
                Mais informações
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Projects;
