import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../adelgam-logo.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBarComponent = () => {
  return (
    <Navbar fixed="top" expand="lg" className="navbar-component">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <i className="fa-solid fa-arrow-right d-lg-none"></i> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/empreendimentos">
              <i className="fa-solid fa-arrow-right d-lg-none"></i>{" "}
              Empreendimentos
            </Nav.Link>{" "}
            <Nav.Link as={Link} to="/sobre">
              <i className="fa-solid fa-arrow-right d-lg-none"></i> A Adelgam
            </Nav.Link>
            <Nav.Link as={Link} to="/contactos">
              <i className="fa-solid fa-arrow-right d-lg-none"></i> Contacte-nos
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
