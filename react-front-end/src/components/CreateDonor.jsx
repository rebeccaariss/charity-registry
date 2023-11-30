import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export function CreateDonor() {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container fluid>
      <Card
        className="text-black m-5"
        style={{ borderRadius: "25px", padding: "1rem" }}
      >
        <Card.Title className="text-center">Register as Donor</Card.Title>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* Donor Information */}
            <Form.Group className="mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row className="mb-4">
              {/* Email */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              {/* Phone Number */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Password */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" size="lg" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
