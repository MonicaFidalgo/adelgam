import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
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

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = project?.details?.plants.map((item) =>
    require(`../assets/${item.image}`)
  );

  const isDeluxePenthouse = project.link === "penthouse-deluxe";

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
            <h2 className="heading-big mb-3">{t(project.name)}</h2>
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

          <div className="caracteristicas project-details-list">
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

          {isDeluxePenthouse && (
            <div className="deluxe-description">
              <p>
                No <strong>terceiro piso</strong>, será recebido por quatro
                suítes majestosas, cada uma desenhada para oferecer o máximo em
                conforto e privacidade. Os espaçosos walk-in closets permitem
                uma organização impecável, enquanto as casas de banho revestidos
                de cerâmica convidam a momentos de relaxamento e
                rejuvenescimento. Além disso, neste piso, encontrará também um
                escritório e uma lavandaria, proporcionando praticidade e
                funcionalidade ao seu dia a dia.
              </p>
              <p>
                Destaca-se a suite principal, onde um duche estilo hotel,
                envolto em vidro, proporciona uma experiência sensorial única,
                com vista para o quarto e uma luxuosa banheira. Além disso, três
                suítes desfrutam de varandas privativas, conectando-te à
                paisagem deslumbrante ao redor.
              </p>
              <p>
                No <strong>quarto piso</strong>, o luxo prossegue com uma sala
                de jantar requintada, perfeita para refeições memoráveis, e duas
                salas, uma das quais em open space com a cozinha, criando um
                ambiente acolhedor e contemporâneo. Além disso, desfruta de um
                terraço deslumbrante com um jacuzzi e cozinha exterior para
                momentos de lazer e entretenimento ao ar livre. Acompanhando o
                luxo, uma garagem espaçosa para quatro carros proporciona
                conveniência e segurança.{" "}
              </p>
            </div>
          )}

          <div className="acabamentos project-details-list">
            <div className="project-details-list-title">Pontos Chave</div>
            <div className="project-details-list-description">
              <ul className="bullet-list">
                {project?.details?.description.map((item, index) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="plantas project-details-list">
            <div className="project-details-list-title">Plantas</div>
            <div className="project-details-list-images">
              {project?.details?.plants.map((item, index) => {
                const projectImagePath = require(`../assets/${item.image}`);

                return (
                  <div key={index}>
                    <img
                      src={projectImagePath}
                      alt="plants"
                      maxWidth="400px"
                      onClick={() => {
                        setPhotoIndex(index);
                        setIsOpen(true);
                      }}
                    />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {isOpen && images.length > 0 && (
              <Lightbox
                mainSrc={images[photoIndex]}
                onImageLoad={() => {
                  window.dispatchEvent(new Event("resize"));
                }}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={
                  images[(photoIndex + images.length - 1) % images.length]
                }
                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={() =>
                  setPhotoIndex(
                    (photoIndex + images.length - 1) % images.length
                  )
                }
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + 1) % images.length)
                }
              />
            )}
          </div>

          {project.iframeLink && (
            <>
              {project.iframeTitle && (
                <h4 className="iframe-title text-center mt-60 mb-3">
                  {project.iframeTitle}
                </h4>
              )}
              <div className="iframe-container">
                <iframe
                  title="Virtual tour"
                  src={project.iframeLink}
                  width="100%"
                  height="500px"
                  style={{ border: "none", backgroundColor: "transparent" }}
                  allowTransparency="true"
                  allowFullScreen
                ></iframe>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ProjectDetail;
