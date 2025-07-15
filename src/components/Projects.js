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
      typologies: "T1 a T4 Penthouse",
      parking: "Box (Para 2 carros)",
      badge: "95% vendido",
      badgeClass: "badge-yellow",
      isApartment: true,
    },
    {
      id: 2,
      name: "Varandas do Montijo",
      image: image2,
      link: "varandas-do-montijo",
      location: "Montijo",
      apartments: "40 apartamentos",
      typologies: "T2 a T4",
      parking: "Box",
      badge: "100% vendido",
      badgeClass: "badge-red",
      isApartment: true,
    },
    {
      id: 3,
      name: "Moradias São Francisco",
      image: image3,
      link: "moradias-sao-francisco",
      location: "São Francisco",
      apartments: "2 Moradias Geminadas",
      typologies: "T4",
      parking: "Garagem para 4 carros",
      badge: "100% vendido",
      badgeClass: "badge-red",
      isApartment: false,
    },
  ];

  return (
    <>
      <Row className="my-60">
        {projectData.map((project) => (
          <Col lg={4} key={project.id}>
            <div className="project">
              <Link to={`/empreendimentos/${project.link}`}>
                <img src={project.image} alt={project.name} />
              </Link>

              <div>
                {" "}
                <h5>{project.name}</h5>
                <label className={`badge ${project.badgeClass}`}>
                  <span className="badge-circle"></span>
                  {project.badge}
                </label>
                <ul>
                  <li>
                    <span>Localização:</span>
                    <strong>{project.location}</strong>
                  </li>
                  <li>
                    <span>
                      {project.isApartment ? "Apartamentos" : "Moradias"}:
                    </span>
                    <strong>{project.apartments}</strong>
                  </li>
                  <li>
                    <span>Tipologias:</span>
                    <strong>{project.typologies}</strong>
                  </li>
                  <li>
                    <span>Estacionamento: </span>
                    <strong>{project.parking}</strong>
                  </li>
                </ul>
                <Link
                  to={`/empreendimentos/${project.link}`}
                  className="button button-primary"
                >
                  Mais informações
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
