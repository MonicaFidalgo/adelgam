import React from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Details = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Row>
      {data &&
        data?.map((item, key) => (
          <Col md={3} key={key}>
            <div className="details">
              <i className={item.label}></i>
              <h4 className="mb-2 mt-3">{t(item.title)}</h4>
              <p>{t(item.description)}</p>
            </div>
          </Col>
        ))}
    </Row>
  );
};
export default Details;
