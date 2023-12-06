import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import React from "react";
import "../styles/NavBar.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleRedirect = (event) => {
    navigate("/");
  };
  
  return (
    <Navbar expand="lg" style={{padding: "1rem"}}>
      <Container fluid>
        <Navbar.Brand onClick={handleRedirect} style={{cursor: "pointer", fontFamily: "'Playfair Display', serif", padding: "8px"}}>karity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto d-flex align-items-center">
            <Button href="/login" variant="outline-secondary" className="me-2">
              Log in
            </Button>{" "}
            <NavDropdown
              title="Register"
              id="basic-nav-dropdown"
              className="register-dropdown"
            >
              <NavDropdown.Item
                href="/donorcreate"
                className="register-dropdown-item"
              >
                As a donor
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/orgcreate"
                className="register-dropdown-item"
              >
                As an organization
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
