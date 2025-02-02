import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../adelgam-logo.svg";
import LanguageDropdown from "./LanguageDropdown";

const NavBarComponent = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expanded={expanded}
      fixed="top"
      expand="lg"
      className="navbar-component"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            setExpanded(expanded ? false : "expanded");
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              <i className="fa-solid fa-arrow-right d-lg-none"></i> Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/empreendimentos"
              onClick={() => setExpanded(false)}
            >
              <i className="fa-solid fa-arrow-right d-lg-none"></i>{" "}
              Empreendimentos
            </Nav.Link>{" "}
            <Nav.Link as={Link} to="/sobre" onClick={() => setExpanded(false)}>
              <i className="fa-solid fa-arrow-right d-lg-none"></i> A Adelgam
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contactos"
              onClick={() => setExpanded(false)}
            >
              <i className="fa-solid fa-arrow-right d-lg-none"></i> Contacte-nos
            </Nav.Link>
            <LanguageDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
