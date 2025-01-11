import React from "react";
import { Row, Col } from "react-bootstrap";
import image1 from "../assets/project1.png";
import image2 from "../assets/project2.png";
import image3 from "../assets/project3.png";

const Projects = () => {
  return (
    <>
      <Row className="mx-60">
        <Col className="offset-md-2" md={8}>
          <div className="text-center">
            <h5 className="heading">Espaços de conforto e harmonia</h5>
            <p>
              Na Adelgam, temos o orgulho de ter entregue inúmeras chaves a
              novos proprietários satisfeitos. Cada projecto que realizamos
              reflecte o nosso compromisso com a qualidade, a inovação e o
              bem-estar das famílias.
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <div className="project">
            <img src={image1} alt="lux terrace" />
            <h5>Lux Terrace</h5>
            <label className="badge badge-yellow">90% vendido</label>
            <ul>
              <li>
                Localização: <strong>Alcochete</strong>
              </li>
              <li>
                Apartamentos: <strong>37 apartamentos e 5 penthouses</strong>
              </li>
              <li>
                Tipologias: <strong>T2 a T3 Penthouse</strong>
              </li>
              <li>
                Estacionamento: <strong>Box (Para 2 carros)</strong>
              </li>
            </ul>
            <button className="button button-primary">Mais informações</button>
          </div>
        </Col>
        <Col lg={4}>
          <div className="project">
            <img src={image2} alt="Varandas do Montijo" />
            <h5>Varandas do Montijo</h5>
            <label className="badge badge-red">100% vendido</label>
            <ul>
              <li>
                Localização: <strong>Alcochete</strong>
              </li>
              <li>
                Apartamentos: <strong>37 apartamentos e 5 penthouses</strong>
              </li>
              <li>
                Tipologias: <strong>T2 a T3 Penthouse</strong>
              </li>
              <li>
                Estacionamento: <strong>Box (Para 2 carros)</strong>
              </li>
            </ul>
            <button className="button button-primary">Mais informações</button>
          </div>
        </Col>
        <Col lg={4}>
          <div className="project">
            <img src={image3} alt="Moradias São Francisco" />
            <h5>Moradias São Francisco</h5>
            <label className="badge badge-red">100% vendido</label>
            <ul>
              <li>
                Localização: <strong>Alcochete</strong>
              </li>
              <li>
                Apartamentos: <strong>37 apartamentos e 5 penthouses</strong>
              </li>
              <li>
                Tipologias: <strong>T2 a T3 Penthouse</strong>
              </li>
              <li>
                Estacionamento: <strong>Box (Para 2 carros)</strong>
              </li>
            </ul>
            <button className="button button-primary">Mais informações</button>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Projects;
