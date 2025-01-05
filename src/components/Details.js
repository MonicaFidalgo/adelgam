import React from "react";
import { Col } from "react-bootstrap";

const Details = ({ data }) => {
  return (
    <>
      {data &&
        data?.map((item, key) => (
          <Col md={3}>
            <div key={key} className="details">
              <label className="mb-1">{item.label}</label>
              <h4 className="mb-2">{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </Col>
        ))}
    </>
  );
};
export default Details;
