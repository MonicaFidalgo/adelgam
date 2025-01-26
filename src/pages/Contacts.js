import React from "react";
import { Container } from "react-bootstrap";
import Form from "../components/Form";
import ContactsSection from "../components/Contacts";

const Contacts = () => {
  return (
    <div>
      <Container className="pt-200">
        <div className="contacts-heading">
          <label className="label mb-4">Fale Connosco</label>
          <h2 className="heading-big">
            Estamos aqui para ajudar. Entre em contacto connosco.
          </h2>
        </div>

        <div className="form-wrapper mx-auto">
          <h4>Precisa de mais informações?</h4>
          <p>
            Preencha o formulário abaixo e a nossa equipa entrará em contacto
            para fornecer os detalhes.
          </p>
          <Form />
        </div>
        <hr />
        <ContactsSection />
        <hr />
        <div className="contacts-map">
          <label className="label mb-4">Onde Estamos?</label>
          <h2 className="heading-big">Venha visitar-nos</h2>
        </div>
      </Container>
    </div>
  );
};
export default Contacts;
