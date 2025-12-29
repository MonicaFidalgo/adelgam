import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../components/ImageCarousel";
import ImageModal from "../components/ImageModal";
import ImageCarousel2 from "../components/Carousel";
import DetailsIcons from "../components/DetailsIcons";
import ImageGallery from "../components/ImageZoom";
import projectsData from "../data/projects.json";
import projectDetails from "../data/penthouse-details.json";
import projectDetails2 from "../data/penthouse-details2.json";

const ProjectDetail = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };
  const { t } = useTranslation();
  const { projectTitle, projectDetailName } = useParams();

  const projectData = projectsData[projectTitle];

  const project =
    projectData.projects?.find((p) => p.link === projectDetailName) ||
    projectData.penthouses?.find((p) => p.link === projectDetailName);

  const hasSecondDescription = project.link === "penthouse-deluxe";
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

          <ImageCarousel2 images={project.images} />

          <ImageCarousel
            images={project.images}
            onImageClick={handleImageClick}
          />
          <ImageModal
            isOpen={selectedImageIndex !== null}
            imageUrl={
              selectedImageIndex !== null
                ? require(`../assets/${project.images[selectedImageIndex]}`)
                : ""
            }
            onClose={handleCloseModal}
          />
          {isDeluxePenthouse && <DetailsIcons data={projectDetails} />}
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
          {hasSecondDescription && (
            <div className="deluxe-description">
              <p>
                No <strong>terceiro piso</strong>, será recebido por quatro
                suítes majestosas, cada uma desenhada para oferecer o máximo em
                conforto e privacidade. Os espaçosos walk-in closets permitem
                uma organização impecável, enquanto as casas de banho revestidas
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
          {isDeluxePenthouse && <DetailsIcons data={projectDetails2} />}
          <div className="acabamentos project-details-list">
            <div className="project-details-list-title">Pontos Chave</div>
            <div className="project-details-list-description">
              <ul className="bullet-list">
                {project?.details?.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="project-details-list-images-wrapper d-none d-md-flex">
                <ImageGallery images={project?.details?.plants} />
              </div>
            </div>
          </div>

          <div className="plantas project-details-list d-md-none">
            <div className="project-details-list-title">Plantas</div>

            <ImageGallery images={project?.details?.plants} />
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
