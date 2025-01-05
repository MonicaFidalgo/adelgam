import React from "react";
import { Col } from "react-bootstrap";

const Numbers = ({ data }) => {
  return (
    <>
      {data &&
        data?.map((item, key) => (
          <Col>
            <div key={key} className="numbers">
              <label>{item.label}</label>
              <p>{item.description}</p>
            </div>
          </Col>
        ))}
    </>
  );
};
export default Numbers;
