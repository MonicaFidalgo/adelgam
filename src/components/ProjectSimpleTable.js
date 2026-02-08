import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Table from "react-bootstrap/Table";

const ProjectSimpleTable = ({ items, projectTitle, isPenthouse = false }) => {
  const { t } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {/* Desktop View */}
      <div className="d-none d-lg-block">
        <Table>
          <thead>
            <tr>
              <th>{t("common.typology")}</th>
              <th>{t("common.area")}</th>
              <th>{t("common.bedrooms")}</th>
              <th>WC</th>
              <th>{isPenthouse ? "BOXES" : t("common.parking")}</th>
              <th>{t("common.price")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex flex-column">
                    <strong>{t(item.name)}</strong>
                    <label className={`badge ${item.badgeClass} mt-1`}>
                      <span className="badge-circle"></span>
                      {t(item.badge)}
                    </label>
                  </div>
                </td>
                <td>{item.details.area || "N/A"}m²</td>
                <td>{t(item.details.bedrooms) || "N/A"}</td>
                <td>{item.details.bathrooms || "N/A"}</td>
                <td>{t(item.details.parking) || "N/A"}</td>
                <td>{item.price ? `${item.price}€` : "N/A"}</td>
                <td>
                  <Link
                    to={`/empreendimentos/${projectTitle}/${item.link}`}
                    className="button button-primary"
                  >
                    {t("common.details")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile View - COLLAPSE */}
      <div className="d-lg-none">
        {items.map((item, index) => (
          <div key={index} className="card-component mb-3">
            <div
              className="card-component-header"
              onClick={() => toggleCard(index)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="collapse-header">
                  <strong>{t(item.name)}</strong>
                  <label
                    className={`badge ${item.badgeClass}`}
                    style={{ marginBottom: 0 }}
                  >
                    <span className="badge-circle"></span>
                    {t(item.badge)}
                  </label>
                </div>
                <span style={{ fontSize: "20px" }}>
                  {expandedCards[index] ? "−" : "+"}
                </span>
              </div>
            </div>

            {/* Card Body */}
            {expandedCards[index] && (
              <div className="card-component-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div
                    className="price"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    {item.price ? `${item.price}€` : "N/A"}
                  </div>
                </div>

                <div className="row mb-3" style={{ fontSize: "14px" }}>
                  <div className="col-6 mb-2">
                    <span style={{ color: "#797978" }}>
                      {t("common.area")}:
                    </span>
                    <strong className="ms-1">
                      {item.details.area || "N/A"}m²
                    </strong>
                  </div>
                  <div className="col-6 mb-2">
                    <span style={{ color: "#797978" }}>
                      {t("common.bedrooms")}:
                    </span>
                    <strong className="ms-1">
                      {t(item.details.bedrooms) || "N/A"}
                    </strong>
                  </div>
                  <div className="col-6 mb-2">
                    <span style={{ color: "#797978" }}>WC:</span>
                    <strong className="ms-1">
                      {item.details.bathrooms || "N/A"}
                    </strong>
                  </div>
                  <div className="col-6 mb-2">
                    <span style={{ color: "#797978" }}>
                      {isPenthouse ? "Boxes" : t("common.parking_short")}:
                    </span>
                    <strong className="ms-1">
                      {t(item.details.parking) || "N/A"}
                    </strong>
                  </div>
                </div>

                <Link
                  className="button button-primary w-100"
                  to={`/empreendimentos/${projectTitle}/${item.link}`}
                >
                  {t("common.details")}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectSimpleTable;
