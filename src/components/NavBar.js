import React from "react";
//import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../adelgam-logo.svg";
//import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBarComponent = () => {
  return (
    <Navbar fixed="top" expand="md">
      <Container>
        {" "}
        <img src={logo} className="logo" alt="brand" />
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
