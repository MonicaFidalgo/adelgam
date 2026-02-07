import React from "react";
import { Container } from "react-bootstrap";
import Form from "../components/Form";
import ContactsSection from "../components/Contacts";
import GoogleMap from "../components/Map";
import { useTranslation } from "react-i18next";

const Contacts = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Container className="pt-200">
        <div className="banner-heading">
          <label className="label mb-4">{t("contacts.talk_to_us")}</label>
          <h2 className="heading-big">{t("contacts.description")}</h2>
        </div>

        <div className="form-wrapper mx-auto">
          <h4>{t("contacts.form.title")}</h4>
          <p>{t("contacts.form.description")}</p>
          <Form />
        </div>
        <hr />
        <ContactsSection />
        <hr />
        <div className="contacts-map">
          <label className="label mb-4">{t("contacts.location")}</label>
          <h2 className="heading-big">{t("contacts.visit_us")}</h2>
        </div>

        <GoogleMap location="Adelgam" width="100%" height="400" />
      </Container>
    </div>
  );
};
export default Contacts;
