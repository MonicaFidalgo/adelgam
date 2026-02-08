import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

const Form = () => {
  const { t } = useTranslation();
  const formId = process.env.REACT_APP_FORM_ID;
  const formSparkUrl = `https://submit-form.com/${formId}`;

  const initialFormState = {
    email: "",
    firstName: "",
    lastName: "",
    telephone: "",
    message: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus("");
    await postSubmission();
    setSubmitting(false);
  };

  const postSubmission = async () => {
    const payload = {
      ...formState,
    };

    try {
      await axios.post(formSparkUrl, payload);
      setFormStatus("success");
      setFormState(initialFormState);
    } catch (error) {
      console.log(error);
      setFormStatus("error");
    }
  };

  return (
    <div>
      {!!formStatus ? (
        <div className="mt-3">
          <p className={formStatus === "success" ? "success" : "error"}>
            {formStatus === "success"
              ? t("form.sent.success")
              : t("form.sent.failed")}
          </p>
        </div>
      ) : (
        <form onSubmit={submitForm}>
          <Row>
            <Col lg={6}>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder={`${t("form.first_name")} *`}
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
                placeholder={`${t("form.last_name")} *`}
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
                placeholder={t("form.phone")}
                value={formState.telephone}
                onChange={handleChange}
                className="mb-4"
                pattern="[0-9+]*"
                onKeyDown={(e) => {
                  if (
                    !/[0-9+]|Backspace|Tab|Enter|Delete|ArrowLeft|ArrowRight/.test(
                      e.key,
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <textarea
                id="message"
                name="message"
                placeholder={t("form.message")}
                value={formState.message}
                onChange={handleChange}
                className="mb-4"
              ></textarea>{" "}
            </Col>
          </Row>
          <Row>
            <Col lg={6}></Col>

            <Col lg={6} className="text-end">
              <button
                disabled={submitting}
                type="submit"
                className="button button-primary"
              >
                {submitting ? "..." : t("common.submit")}
              </button>
            </Col>
          </Row>
        </form>
      )}
    </div>
  );
};

export default Form;
