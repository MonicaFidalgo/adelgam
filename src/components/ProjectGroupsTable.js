import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Table from "react-bootstrap/Table";

const ProjectGroupsTable = ({
  groups,
  projectTitle,
  openDropdowns,
  toggleDropdown,
  calculateGroupBadge,
  sectionName = "projects",
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop View - Table with dropdowns */}
      <div className="d-none d-lg-block" style={{ overflowX: "auto" }}>
        <Table style={{ tableLayout: "fixed", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "22%" }}>TIPOLOGIA</th>
              <th style={{ width: "12%" }}>ÁREA</th>
              <th style={{ width: "12%" }}>Varandas</th>
              <th style={{ width: "10%" }}>Piso</th>
              <th style={{ width: "13%" }}>Box/Arrec</th>
              <th style={{ width: "15%" }}>PREÇO</th>
              <th style={{ width: "16%" }}></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, groupIndex) => {
              const items = group.apartments;
              const dynamicBadge = calculateGroupBadge(items);

              return (
                <>
                  {/* Group Header Row */}
                  <tr key={`group-${groupIndex}`}>
                    <td
                      colSpan="7"
                      style={{
                        padding: "0",
                        backgroundColor: "transparent",
                      }}
                    >
                      <button
                        onClick={() => toggleDropdown(sectionName, groupIndex)}
                        className="w-100 text-start"
                        style={{
                          background: "rgba(189, 154, 104, 0.2)",
                          border: "none",
                          padding: "20px 40px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <strong
                            style={{ color: "#bd9a68", fontSize: "16px" }}
                          >
                            {group.typology}
                          </strong>
                          <label
                            className={`badge ${dynamicBadge.class}`}
                            style={{ marginBottom: 0 }}
                          >
                            <span className="badge-circle"></span>
                            {dynamicBadge.text}
                          </label>
                        </div>
                        <span style={{ fontSize: "20px", color: "#bd9a68" }}>
                          {openDropdowns[sectionName]?.[groupIndex] ? "−" : "+"}
                        </span>
                      </button>
                    </td>
                  </tr>

                  {/* Group Items */}
                  {openDropdowns[sectionName]?.[groupIndex] &&
                    items.map((item, itemIndex) => (
                      <tr key={`item-${groupIndex}-${itemIndex}`}>
                        <td>
                          <div className="d-flex flex-column">
                            <strong>{t(item.name)}</strong>
                            {item.badge && (
                              <label
                                className={`badge ${item.badgeClass} mt-1`}
                                style={{ marginBottom: 0 }}
                              >
                                <span className="badge-circle"></span>
                                {item.badge}
                              </label>
                            )}
                          </div>
                        </td>
                        <td>{item.details.area || "N/A"}m²</td>
                        <td>{item.details.terrace || "N/A"}m²</td>
                        <td>{item.details.floor || "N/A"}</td>
                        <td>
                          {item.details.parking ||
                            (item.details.storage ? "Arrec." : "—")}
                        </td>
                        <td>{item.price ? `${item.price}€` : "N/A"}</td>
                        <td>
                          {item.badge === "Vendido" ? (
                            <span
                              className="button"
                              style={{
                                backgroundColor: "#999",
                                color: "#fff",
                                cursor: "not-allowed",
                                opacity: 0.6,
                              }}
                            >
                              Vendido
                            </span>
                          ) : (
                            <Link
                              to={`/empreendimentos/${projectTitle}/${item.link}`}
                              className="button button-primary"
                            >
                              Detalhes
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                </>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* Mobile View - Collapsible Cards */}
      <div className="d-lg-none">
        {groups.map((group, groupIndex) => {
          const items = group.apartments || group.penthouses;
          const dynamicBadge = calculateGroupBadge(items);
          const mobileSectionName = `${sectionName}-mobile`;

          return (
            <div key={groupIndex} className="card-component mb-3">
              <div className="card-component-header">
                <button
                  className="btn w-100 text-start p-0"
                  onClick={() => toggleDropdown(mobileSectionName, groupIndex)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <strong>{group.typology}</strong>
                      <label
                        className={`badge ${dynamicBadge.class}`}
                        style={{ marginBottom: 0 }}
                      >
                        <span className="badge-circle"></span>
                        {dynamicBadge.text}
                      </label>
                    </div>
                    <span style={{ fontSize: "20px" }}>
                      {openDropdowns[mobileSectionName]?.[groupIndex]
                        ? "−"
                        : "+"}
                    </span>
                  </div>
                </button>
              </div>

              {openDropdowns[mobileSectionName]?.[groupIndex] && (
                <div>
                  {items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="card-component-body"
                      style={{
                        borderTop:
                          itemIndex > 0
                            ? "1px solid rgba(189, 154, 104, 0.2)"
                            : "none",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <strong style={{ fontSize: "16px" }}>
                            {t(item.name)}
                          </strong>
                          {item.badge && (
                            <div className="mt-2">
                              <label
                                className={`badge ${item.badgeClass}`}
                                style={{ marginBottom: 0 }}
                              >
                                <span className="badge-circle"></span>
                                {item.badge}
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="price" style={{ fontSize: "18px" }}>
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
                          <span style={{ color: "#797978" }}>Estacion.:</span>
                          <strong className="ms-1">
                            {item.details.parking || "N/A"}
                          </strong>
                        </div>
                      </div>

                      {item.badge === "Vendido" ? (
                        <button
                          disabled
                          className="button w-100"
                          style={{
                            backgroundColor: "#999",
                            color: "#fff",
                            cursor: "not-allowed",
                            opacity: 0.6,
                          }}
                        >
                          Vendido
                        </button>
                      ) : (
                        <Link
                          to={`/empreendimentos/${projectTitle}/${item.link}`}
                          className="button button-primary w-100"
                        >
                          Ver Detalhes
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProjectGroupsTable;
