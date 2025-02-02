import React from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Numbers = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Row>
      {data &&
        data?.map((item, key) => (
          <Col lg={3} key={key}>
            <div className="numbers">
              <label>{t(item.label)}</label>
              <p>{t(item.description)}</p>
            </div>
          </Col>
        ))}
    </Row>
  );
};
export default Numbers;
