import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import imagePortasDoTejo from "../assets/empreendimentos/portas-do-tejo.webp";
import imagePenthouse from "../assets/empreendimentos/penthouse-lux-terrace.webp";
import imageVarandas from "../assets/empreendimentos/varandas-do-montijo.webp";
import imageMoradias from "../assets/empreendimentos/moradias-sao-francisco.webp";
import imageLuxTerrace from "../assets/empreendimentos/lux-terrace-alcochete.webp";
import { PORTAS_DO_TEJO_URL, PENTHOUSE_URL } from "../data/externalLinks";

// Empreendimentos: a venda como montra (cartoes horizontais largos, foto de um
// lado e ficha com botao do outro); obras entregues numa faixa escura a toda a
// largura, em mosaico de fotografias com legenda. Igual na home e em
// /empreendimentos. As paginas poem este bloco fora do seu Container.

// Empreendimentos a venda: links externos para a pagina propria de cada um.
// hideOnMobile: linha que sai no telemovel para o botao ficar mais perto.
const forSaleProjects = [
  {
    id: 1,
    name: "Portas do Tejo",
    location: "Montijo",
    image: imagePortasDoTejo,
    url: PORTAS_DO_TEJO_URL,
    facts: [
      {
        label: "common.available_now",
        value: "projects_list.portas_do_tejo.available",
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
    location: "Alcochete",
    image: imagePenthouse,
    url: PENTHOUSE_URL,
    facts: [
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
// A primeira e a peca grande do mosaico. position: enquadramento da foto.
const deliveredProjects = [
  {
    id: 3,
    name: "Lux Terrace Alcochete",
    location: "Alcochete",
    image: imageLuxTerrace,
    position: "85% 50%",
    link: "lux-terrace",
    summary: "projects_list.lux_terrace.apartments",
  },
  {
    id: 4,
    name: "Varandas do Montijo",
    location: "Montijo",
    image: imageVarandas,
    position: "50% 30%",
    link: "varandas-do-montijo",
    summary: "projects_list.varandas_do_montijo.apartments",
  },
  {
    id: 2,
    name: "Moradias São Francisco",
    location: "São Francisco, Alcochete",
    image: imageMoradias,
    position: "50% 55%",
    link: "moradias",
    summary: "projects_list.moradias_sao_francisco.typologies",
  },
];

const ShowcaseCard = ({ project, reverse }) => {
  const { t } = useTranslation();
  return (
    <article className={`showcase${reverse ? " showcase-reverse" : ""}`}>
      <Row className="g-0 align-items-center">
        <Col lg={{ span: 7, order: reverse ? 2 : 1 }}>
          <a href={project.url} className="showcase-image">
            <img src={project.image} alt={project.name} />
          </a>
        </Col>
        <Col lg={{ span: 5, order: reverse ? 1 : 2 }}>
          <div className="showcase-panel">
            <label className="badge badge-green">
              <span className="badge-circle"></span>
              {t("common.for_sale")}
            </label>
            <p className="showcase-location">{project.location}</p>
            <h3>{project.name}</h3>
            <ul>
              {project.facts.map((fact) => (
                <li
                  key={fact.label}
                  className={fact.hideOnMobile ? "d-none d-lg-block" : ""}
                >
                  <span>{t(fact.label)}</span>
                  <strong>{t(fact.value)}</strong>
                </li>
              ))}
            </ul>
            <a href={project.url} className="button button-primary">
              {t("common.see_availability")}
            </a>
          </div>
        </Col>
      </Row>
    </article>
  );
};

const MosaicTile = ({ project, index }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/empreendimentos/${project.link}`}
      className={`mosaic-tile mosaic-tile-${index + 1}`}
    >
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        style={{ objectPosition: project.position }}
      />
      <div className="mosaic-caption">
        <span className="badge badge-neutral">
          <span className="badge-circle"></span>
          {t("common.delivered")}
        </span>
        <h3>{project.name}</h3>
        <p>
          {project.location} · {t(project.summary)}
        </p>
        <span className="mosaic-cta">{t("common.view_project")}</span>
      </div>
    </Link>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="showcase-section">
        <Container>
          <div className="section-intro">
            <h2 className="heading">
              {t("projects_list.groups.for_sale_title")}
            </h2>
            <p>{t("projects_list.editorial.for_sale_intro")}</p>
          </div>
          {forSaleProjects.map((project, index) => (
            <ShowcaseCard
              project={project}
              reverse={index % 2 === 1}
              key={project.id}
            />
          ))}
        </Container>
      </section>

      <section className="portfolio-band">
        <Container>
          <div className="portfolio-divider">
            <span>{t("projects_list.editorial.delivered_label")}</span>
          </div>
          <div className="portfolio-intro">
            <h2>{t("projects_list.groups.delivered_title")}</h2>
            <p>{t("projects_list.editorial.delivered_intro")}</p>
          </div>
          <div className="mosaic">
            {deliveredProjects.map((project, index) => (
              <MosaicTile project={project} index={index} key={project.id} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};
export default Projects;
