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
  const { role, id: sessionId } = cookies.charityregistry_auth || {};
  const navigate = useNavigate();

  const handleRedirect = (event) => {
    navigate(`/api/projects/followed-projects/${sessionId}`);
  };

  const handleLogout = (event) => {
    setCookie("charityregistry_auth", "", { expires: new Date(0) });
    navigate("/");
  };

  return (
    <Navbar expand="lg" style={{padding: "1rem"}}>
      <Container fluid>
        <Navbar.Brand onClick={handleRedirect} style={{cursor: "pointer", fontFamily: "'Playfair Display', serif", padding: "8px"}}>karity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/organizations">Organizations</Nav.Link>
            {role === 'donor' && (
              <Nav.Link href={`/api/projects/followed-projects/${sessionId}`}>
                My Organizations
              </Nav.Link>
            )}
            {role === 'organization' && (
              <Nav.Link href={`/Profile/${sessionId}`}>
                Organization Profile
              </Nav.Link>
            )}
            {role === 'donor' && (
            <Nav.Link href={`/api/donations/user/${sessionId}`}>My Donations</Nav.Link>
            )}
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
