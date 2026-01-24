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
              <th>TIPOLOGIA</th>
              <th>ÁREA</th>
              <th>QUARTOS</th>
              <th>WC</th>
              <th>{isPenthouse ? "BOXES" : "ESTACIONAMENTO"}</th>
              <th>PREÇO</th>
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
                      {item.badge}
                    </label>
                  </div>
                </td>
                <td>{item.details.area || "N/A"}m²</td>
                <td>{item.details.bedrooms || "N/A"}</td>
                <td>{item.details.bathrooms || "N/A"}</td>
                <td>{item.details.parking || "N/A"}</td>
                <td>{item.price ? `${item.price}€` : "N/A"}</td>
                <td>
                  <Link
                    to={`/empreendimentos/${projectTitle}/${item.link}`}
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
                <div className="d-flex align-items-center gap-3">
                  <strong>{t(item.name)}</strong>
                  <label
                    className={`badge ${item.badgeClass}`}
                    style={{ marginBottom: 0 }}
                  >
                    <span className="badge-circle"></span>
                    {item.badge}
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
                    <span style={{ color: "#797978" }}>Área:</span>
                    <strong className="ms-1">
                      {item.details.area || "N/A"}m²
                    </strong>
                  </div>
                  <div className="col-6 mb-2">
                    <span style={{ color: "#797978" }}>Quartos:</span>
                    <strong className="ms-1">
                      {item.details.bedrooms || "N/A"}
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
                      {isPenthouse ? "Boxes" : "Estacion."}:
                    </span>
                    <strong className="ms-1">
                      {item.details.parking || "N/A"}
                    </strong>
                  </div>
                </div>

                <Link
                  className="button button-primary w-100"
                  to={`/empreendimentos/${projectTitle}/${item.link}`}
                >
                  Ver Detalhes
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
