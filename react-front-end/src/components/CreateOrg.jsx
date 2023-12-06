import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function CreateOrg() {
  const navigate = useNavigate();
  // Initialize form state with empty fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    street_number: "",
    street_name: "",
    unit: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
    email: "",
    password: "",
    phone: "",
    category: "",
    website: "",
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
      const response = await fetch("/api/organizations", {
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
    <Container fluid className="d-flex align-items-center justify-content-center">
      <Card
        className="text-black m-5"
        style={{
          width: "45%",
          borderRadius: "25px",
          padding: "1rem",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        <Card.Title className="text-center" style={{
          fontSize: "1.5rem",
          fontWeight: "italic",
          marginBottom: "1rem",
          color: "#333",
        }}>
        Create Your Organization
        </Card.Title>
        <Card.Body className="text-end">
          <Form onSubmit={handleFormSubmit}>
            {/* Organization Information */}
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Bio"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Website"
                id="website"
                value={formData.website}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="tel"
                placeholder="Phone number"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>

             <Form.Group className="mb-4">
            <Form.Label></Form.Label>
            <Form.Select id="category" value={formData.category} onChange={handleInputChange}>
              <option value="">Category</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Arts & Culture">Arts & Culture</option>
              <option value="Elderly Care">Elderly Care</option>
              <option value="Environmental">Environmental</option>
              <option value="Education">Education</option>
              <option value="Food Security">Food Security</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Housing">Housing</option>
              <option value="LGBTQ+">LGBTQ+</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Religion & Faith">Religion & Faith</option>
            </Form.Select>
          </Form.Group>

            {/* Address Information */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Recipient/contact"
                    id="recipient"
                    value={formData.recipient}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={3}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Street #"
                    id="street_number"
                    value={formData.street_number}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Unit"
                    id="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Street name"
                    id="street_name"
                    value={formData.street_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Province"
                    id="province"
                    value={formData.province}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Postal code"
                    id="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

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
              <Col md={5}>
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
              <Col md={5}>
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
              }}>
              Create Organization
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
