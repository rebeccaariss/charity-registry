import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSession } from "../providers/SessionProvider";

const Login = () => {
  const navigate = useNavigate();
  const { updateSession } = useSession(); // Destructuring

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data); 
        updateSession(data);
  
        // Conditional redirection based on the user role
        if (data.role === "organization") {
          navigate(`/Profile/${data.id}`);
        } else if (data.role === "donor") {
          navigate(`/api/projects/followed-projects/${data.id}`);
        }
      } else {
        // TODO: Add bootstrap alert here
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center">
      <Card className="text-black m-5" style={{ borderRadius: "25px", padding: "1rem", width: "25%", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
      <Card.Title className="text-center" style={{
            fontSize: "1.5rem",
            fontWeight: "italic",
            marginBottom: "1rem",
            color: "#333",
          }}>Log in</Card.Title>
        <Card.Body className="text-end">
          <Form onSubmit={handleFormSubmit}>
              <Row className="mb-4">
              {/* Email */}
              <Col md={12}>
                <Form.Group>
                  <Form.Control type="email" placeholder="Email" name="email" value={credentials.email} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            {/* Password */}
            <Row className="mb-4">
              <Col md={12}>
                <Form.Group>
                  <Form.Control type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" size="md" type="submit" style={{ background: "linear-gradient(45deg, #562262, #693eeb)"}}>Log in</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;