import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import projectsData from "../data/projects.json";
import Higlights from "../components/Highlights";
import ImageCarousel from "../components/ImageCarouselNew";
import ImageModal from "../components/ImageModalNew";
import ProjectGroupsTable from "../components/ProjectGroupsTable";
import ProjectSimpleTable from "../components/ProjectSimpleTable";
import DetailsIcons from "../components/DetailsIcons";
import ImageGallery from "../components/ImageZoom";

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

  const calculateGroupBadge = (items) => {
    const total = items.length;
    const sold = items.filter(
      (item) => item.badge && item.badge.toLowerCase().includes("vendido"),
    ).length;
    const available = total - sold;

    if (sold === total) {
      return { text: "100% vendido", class: "badge-red" };
    } else if (available === 1) {
      return { text: "1 disponível", class: "badge-green" };
    } else {
      return { text: `${available} disponíveis`, class: "badge-green" };
    }
  };

  const projectData = projectsData[projectTitle];

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
    badgeClass,
    badge,
    location,
    state,
    typology,
    isMoreInfoSoon,
  } = projectData;

  const hasNewStructure = projectGroups && projectGroups.length > 0;
  const hasOldStructure = projects && projects.length > 0;
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
            currentIndex={selectedImageIndex !== null ? selectedImageIndex : 0}
            totalImages={images.length}
          />
        </>
      ) : (
        <h4 className="text-center">🚧 Página em construção 🚧</h4>
      )}

      {isMoreInfoSoon && (
        <h4 className="text-center text-2xl mt-5">Mais informações em breve</h4>
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

      {/* APARTAMENTS - new structure (with dropdowns) */}
      {hasNewStructure && (
        <div className="my-60">
          <h3 className="heading text-center mb-60">Apartamentos T1 - T3</h3>
          <ProjectGroupsTable
            groups={projectGroups}
            projectTitle={projectTitle}
            openDropdowns={openDropdowns}
            toggleDropdown={toggleDropdown}
            calculateGroupBadge={calculateGroupBadge}
            sectionName="projects"
          />
        </div>
      )}

      {/* APARTAMENTS - Old structure (simple table) */}
      {hasOldStructure && !hasNewStructure && (
        <div className="my-60">
          <h3 className="heading text-center mb-60">Apartamentos T1 - T3</h3>
          <ProjectSimpleTable
            items={projects}
            projectTitle={projectTitle}
            isPenthouse={false}
          />
        </div>
      )}

      {/* PENTHOUSES - Old structure (simple table) */}
      {hasPenthousesOld && (
        <div className="my-60">
          <h3 className="heading text-center mb-60">Penthouses</h3>
          <ProjectSimpleTable
            items={penthouses}
            projectTitle={projectTitle}
            isPenthouse={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectParent;
