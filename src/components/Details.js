import React from "react";
import { Col, Row } from "react-bootstrap";

const Details = ({ data }) => {
  return (
    <Row>
      {data &&
        data?.map((item, key) => (
          <Col md={3} key={key}>
            <div className="details">
              <i className={item.label}></i>
              <h4 className="mb-2 mt-3">{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </Col>
        ))}
    </Row>
  );
};
export default Details;
