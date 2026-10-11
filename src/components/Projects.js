import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import image1 from "../assets/project1.png";
import image2 from "../assets/project2.png";
import image3 from "../assets/project3.png";
import image4 from "../assets/project4.png";
import imagePenthouse from "../assets/penthouse-lux-terrace-exterior.webp";
import imageLuxTerraceWide from "../assets/apartment-t1/Lux-Terrace-Alcochete-Exterior-Frente-1920w.webp";
import { Link } from "react-router-dom";
import { PORTAS_DO_TEJO_URL, PENTHOUSE_URL } from "../data/externalLinks";

// Empreendimentos a venda: links externos para a pagina propria de cada um.
const forSaleProjects = [
  {
    id: 1,
    name: "Portas do Tejo",
    image: image4,
    url: PORTAS_DO_TEJO_URL,
    badge: "common.for_sale",
    badgeClass: "badge-green",
    button: "common.see_availability",
    facts: [
      { label: "common.location", value: "Montijo", raw: true },
      {
        label: "common.phase_for_sale",
        value: "projects_list.portas_do_tejo.phase",
      },
      {
        label: "common.tipologias",
        value: "projects_list.portas_do_tejo.typologies_for_sale",
      },
      {
        label: "common.expected_delivery",
        value: "projects_list.portas_do_tejo.delivery",
      },
    ],
  },
  {
    id: 5,
    name: "Penthouse Lux Terrace",
    image: imagePenthouse,
    url: PENTHOUSE_URL,
    badge: "common.for_sale",
    badgeClass: "badge-green",
    button: "common.see_availability",
    facts: [
      { label: "common.location", value: "Alcochete", raw: true },
      { label: "common.typology", value: "projects_list.penthouse.typology" },
      {
        label: "common.highlights",
        value: "projects_list.penthouse.highlights",
      },
      { label: "common.parking", value: "projects_list.penthouse.parking" },
    ],
  },
];

// Obras entregues: continuam a abrir as paginas internas de cada uma.
const deliveredProjects = [
  {
    id: 4,
    name: "Varandas do Montijo",
    image: image2,
    link: "varandas-do-montijo",
    badge: "common.sold",
    badgeClass: "badge-red",
    button: "common.view_project",
    facts: [
      { label: "common.location", value: "Montijo", raw: true },
      {
        label: "common.apartments",
        value: "projects_list.varandas_do_montijo.apartments",
      },
      {
        label: "common.tipologias",
        value: "projects_list.varandas_do_montijo.typologies",
      },
      {
        label: "common.parking",
        value: "projects_list.varandas_do_montijo.parking",
      },
    ],
  },
  {
    id: 2,
    name: "Moradias São Francisco",
    image: image3,
    link: "moradias",
    badge: "common.sold",
    badgeClass: "badge-red",
    button: "common.view_project",
    facts: [
      { label: "common.location", value: "São Francisco", raw: true },
      {
        label: "common.moradias",
        value: "projects_list.moradias_sao_francisco.apartments",
      },
      {
        label: "common.tipologias",
        value: "projects_list.moradias_sao_francisco.typologies",
      },
      {
        label: "common.parking",
        value: "projects_list.moradias_sao_francisco.parking",
      },
    ],
  },
  {
    id: 3,
    name: "Lux Terrace Alcochete",
    image: image1,
    // cartao largo no computador (ocupa as duas colunas), com fotografia exterior
    wide: true,
    wideImage: imageLuxTerraceWide,
    link: "lux-terrace",
    badge: "common.sold",
    badgeClass: "badge-red",
    button: "common.view_project",
    facts: [
      { label: "common.location", value: "Alcochete", raw: true },
      {
        label: "common.apartments",
        value: "projects_list.lux_terrace.apartments",
      },
      {
        label: "common.tipologias",
        value: "projects_list.lux_terrace.typologies",
      },
      {
        label: "common.parking",
        value: "projects_list.lux_terrace.parking",
      },
    ],
  },
];

// Link externo (<a href>, mesmo separador) quando ha url; senao, rota interna.
const ProjectLink = ({ project, className, children }) =>
  project.url ? (
    <a href={project.url} className={className}>
      {children}
    </a>
  ) : (
    <Link to={`/empreendimentos/${project.link}`} className={className}>
      {children}
    </Link>
  );

const ProjectInfo = ({ project }) => {
  const { t } = useTranslation();
  return (
    <>
      <h5>{project.name}</h5>
      <label className={`badge ${project.badgeClass}`}>
        <span className="badge-circle"></span>
        {t(project.badge)}
      </label>
      <ul>
        {project.facts.map((fact) => (
          <li key={fact.label}>
            <span>{t(fact.label)}:</span>
            <strong>{fact.raw ? fact.value : t(fact.value)}</strong>
          </li>
        ))}
      </ul>
      <ProjectLink project={project} className="button button-primary">
        {t(project.button)}
      </ProjectLink>
    </>
  );
};

// Cartao largo: fotografia a esquerda (7/12) e texto a direita no computador,
// empilhado no telemovel como os outros.
const WideProjectCard = ({ project }) => (
  <Col lg={12}>
    <div className="project project-wide">
      <Row>
        <Col lg={7}>
          <ProjectLink project={project}>
            <img
              src={project.wideImage}
              alt={project.name}
              className="project-wide-image"
            />
          </ProjectLink>
        </Col>
        <Col lg={5} className="align-self-center ps-lg-5">
          <ProjectInfo project={project} />
        </Col>
      </Row>
    </div>
  </Col>
);

const ProjectCard = ({ project }) => (
  <Col lg={6}>
    <div className="project">
      <ProjectLink project={project}>
        <img src={project.image} alt={project.name} />
      </ProjectLink>

      <div>
        <ProjectInfo project={project} />
      </div>
    </div>
  </Col>
);

// Cartoes em linhas de dois, como antes; um cartao largo ocupa a linha toda.
// A primeira linha fica mais perto do subtitulo do grupo.
const ProjectRows = ({ projects }) => {
  const rows = [];
  let pair = [];
  projects.forEach((project) => {
    if (project.wide) {
      if (pair.length) rows.push(pair);
      rows.push([project]);
      pair = [];
    } else {
      pair.push(project);
      if (pair.length === 2) {
        rows.push(pair);
        pair = [];
      }
    }
  });
  if (pair.length) rows.push(pair);
  return rows.map((row, index) => (
    <Row className={index === 0 ? "mt-4 mb-60" : "my-60"} key={row[0].id}>
      {row.map((project) =>
        project.wide ? (
          <WideProjectCard project={project} key={project.id} />
        ) : (
          <ProjectCard project={project} key={project.id} />
        ),
      )}
    </Row>
  ));
};

const Projects = () => {
  const { t } = useTranslation();
  return (
    <>
      <h3 className="projects-group-heading">
        {t("projects_list.groups.for_sale_title")}
      </h3>
      <ProjectRows projects={forSaleProjects} />

      <h3 className="projects-group-heading">
        {t("projects_list.groups.delivered_title")}
      </h3>
      <ProjectRows projects={deliveredProjects} />
    </>
  );
};
export default Projects;
