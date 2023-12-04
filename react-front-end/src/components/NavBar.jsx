import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import React from "react";
import "../styles/NavBar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["charityregistry_auth"]);

  const navigate = useNavigate();

  const handleRedirect = (event) => {
    navigate("/api/projects/followed-projects");
  };

  const handleLogout = (event) => {
    setCookie("charityregistry_auth", "", { expires: new Date(0) });
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={handleRedirect} style={{cursor: "pointer"}}>Charity App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/organizations">Organizations</Nav.Link>
            <Nav.Link href="api/projects/followed-projects">
              My Organizations
            </Nav.Link>
            <Nav.Link href="/api/donations/user/:id">My Donations</Nav.Link>
            <Nav.Link href="/api/profile/:id">Projects</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex">
            <Button onClick={handleLogout} variant="outline-secondary" className="ms-auto">
              Logout
            </Button>{" "}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
