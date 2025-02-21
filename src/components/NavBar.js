import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../adelgam-logo.svg";

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
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/empreendimentos"
              onClick={() => setExpanded(false)}
            >
              {" "}
              Empreendimentos
            </Nav.Link>{" "}
            <Nav.Link as={Link} to="/sobre" onClick={() => setExpanded(false)}>
              A Adelgam
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contactos"
              onClick={() => setExpanded(false)}
            >
              Contacte-nos
            </Nav.Link>
            {/* <LanguageDropdown /> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
