import React from "react";
import { Row, Col } from "react-bootstrap";

const Numbers = ({ data }) => {
  return (
    <Row>
      {data &&
        data?.map((item, key) => (
          <Col lg={3} key={key}>
            <div className="numbers">
              <label>{item.label}</label>
              <p>{item.description}</p>
            </div>
          </Col>
        ))}
    </Row>
  );
};
export default Numbers;
