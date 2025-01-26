import React from "react";
import { Container } from "react-bootstrap";
import Numbers from "../components/Numbers";
import numbers from "../data/numbers.json";

const About = () => {
  return (
    <div>
      <Container className="pt-200 ">
        <div className="contacts-heading mb-4">
          <label className="label mb-4">Conheça a Adelgam</label>
          <h2 className="heading-big">
            Há mais de 25 anos, a construir com qualidade e inovação.
          </h2>
        </div>
        <hr />
        <Numbers data={numbers} />
      </Container>
    </div>
  );
};
export default About;
