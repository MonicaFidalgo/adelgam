import React, { useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

const Form = () => {
  const formId = "4M7nbMWB3";
  const formSparkUrl = `https://submit-form.com/${formId}`;

  const initialFormState = {
    email: "",
    firstName: "",
    lastName: "",
    telephone: "",
    message: "",
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    await postSubmission();
  };

  const postSubmission = async () => {
    const payload = {
      ...formState,
    };

    try {
      const response = await axios.post(formSparkUrl, payload);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <Row>
        <Col lg={6}>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Primeiro Nome *"
            required
            value={formState.firstName}
            onChange={handleChange}
            className="mb-4"
          />
        </Col>
        <Col lg={6}>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Último Nome *"
            required
            value={formState.lastName}
            onChange={handleChange}
            className="mb-4"
          />
        </Col>
      </Row>{" "}
      <Row>
        <Col lg={6}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email *"
            required
            value={formState.email}
            onChange={handleChange}
            className="mb-4"
          />
        </Col>
        <Col lg={6}>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            placeholder="Telefone (Opcional)"
            value={formState.telephone}
            onChange={handleChange}
            className="mb-4"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={formState.message}
            onChange={handleChange}
            className="mb-4"
          ></textarea>{" "}
        </Col>
      </Row>
      <Row>
        <Col lg={6}></Col>

        <Col lg={6} className="text-end">
          <button type="submit" className="button button-primary">
            Submeter
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default Form;
