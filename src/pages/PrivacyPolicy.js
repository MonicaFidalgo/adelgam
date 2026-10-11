import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const PrivacyPolicy = () => {
  // O titulo do separador vem de meta.pages.privacy (useDocumentLanguage, App.js).
  const { t } = useTranslation();

  return (
    <div>
      <Container className="pt-200">
        <div className="banner-heading">
          <label className="label mb-4">{t("privacy.label")}</label>
          <h2 className="heading-big">{t("privacy.title")}</h2>
        </div>

        <div className="form-wrapper mx-auto privacy-policy">
          <p>{t("privacy.updated")}</p>
          {SECTIONS.map((n) => (
            <div key={n}>
              <h4>{t(`privacy.s${n}_title`)}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(`privacy.s${n}_text`),
                }}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
