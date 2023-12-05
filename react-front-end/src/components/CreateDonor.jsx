import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function CreateDonor() {
  const navigate = useNavigate();
  // Initialize form state with empty fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  // Update form state when typing in inputs
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("Success:", data);
      // Show success message or redirect
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <Card
        className="text-black m-5"
        style={{
          width: "35%",
          borderRadius: "25px",
          padding: "1rem",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        <Card.Title
          className="text-center"
          style={{
            fontSize: "1.5rem",
            fontWeight: "italic",
            marginBottom: "1rem",
            color: "#333",
          }}
        >
          Register as a Donor
        </Card.Title>
        <Card.Body className="text-end">
          <Form onSubmit={handleFormSubmit}>
            {/* Donor Information */}
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Name"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Phone Number */}
            <Form.Group className="mb-4">
              <Form.Control
                type="tel"
                placeholder="Phone number"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row className="mb-4">
              {/* Email */}
              <Col md={12}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Password */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    id="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              style={{
                // background: "linear-gradient(45deg, #333655, #22ACC1)",
                background: "linear-gradient(45deg, #562262, #693eeb)",
                border: "none",
              }}
            >
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
