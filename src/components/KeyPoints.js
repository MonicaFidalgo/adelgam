import { useTranslation } from "react-i18next";
import ImageGallery from "./ImageZoom";

// Icone de linha (dourado, decorativo) de cada ponto chave.
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10.25" />
      <path d="M7.5 12.5l3 3 6-6.5" />
    </svg>
  );
}

// Bloco "Pontos chave" + "Plantas" das paginas de empreendimento (Moradias)
// e das fichas de fracao (Lux Terrace, Portas do Tejo). Os pontos ficam numa
// grelha de duas colunas (uma no telemovel) e as plantas por baixo, com a
// legenda e a galeria de hoje (clique abre o visualizador).
export default function KeyPoints({ items, plants }) {
  const { t } = useTranslation();
  const hasItems = Array.isArray(items) && items.length > 0;
  const hasPlants = Array.isArray(plants) && plants.length > 0;
  if (!hasItems && !hasPlants) return null;

  return (
    <section className="key-points">
      {hasItems && (
        <>
          <h3 className="key-points-title">{t("common.key_points")}</h3>
          <ul className="key-points-grid">
            {items.map((item, index) => (
              <li key={index}>
                <span className="key-points-icon">
                  <CheckIcon />
                </span>
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {hasPlants && (
        <div className={hasItems ? "key-points-plans" : undefined}>
          {hasItems ? (
            <h4 className="key-points-subtitle">{t("common.plants")}</h4>
          ) : (
            <h3 className="key-points-title">{t("common.plants")}</h3>
          )}
          <ImageGallery images={plants} />
        </div>
      )}
    </section>
  );
}
