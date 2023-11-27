import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export function CreateOrg() {
  // Initialize form state with empty fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    street_number: '',
    street_name: '',
    unit: '',
    city: '',
    province: '',
    country: '',
    postal_code: '',
    email: '',
    password: '',
    phone: '',
    category: '',
    website: '',
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
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Success:', data);
      // Show success message or redirect
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <Container fluid>
      <Card className='text-black m-5' style={{ borderRadius: '25px', padding: '1rem' }}>
      <Card.Title className="text-center">Create Your Organization</Card.Title>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* Organization Information */}
            <Form.Group className='mb-4'>
              <Form.Label>Organization Name</Form.Label>
              <Form.Control type='text' id='name' value={formData.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>Bio/Description</Form.Label>
              <Form.Control type='text' id='description' value={formData.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>Website</Form.Label>
              <Form.Control type='text' id='website' value={formData.website} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>Category</Form.Label>
              <Form.Control type='text' id='category' value={formData.category} onChange={handleInputChange} />
            </Form.Group>

            {/* Address Information */}
            <Row className='mb-4'>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Recipient/Contact Name</Form.Label>
                  <Form.Control type='text' id='recipient' value={formData.recipient} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Street Number</Form.Label>
                  <Form.Control type='text' id='street_number' value={formData.street_number} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control type='text' id='unit' value={formData.unit} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-4'>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Street Name</Form.Label>
                  <Form.Control type='text' id='street_name' value={formData.street_name} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='text' id='city' value={formData.city} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Province</Form.Label>
                  <Form.Control type='text' id='province' value={formData.province} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-4'>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Postal/Zip Code</Form.Label>
                  <Form.Control type='text' id='postal_code' value={formData.postal_code} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type='text' id='country' value={formData.country} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

              <Row className='mb-4'>
              {/* Email */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' id='email' value={formData.email} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              {/* Phone Number */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type='tel' id='phone' value={formData.phone} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            {/* Password */}
            <Row className='mb-4'>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' id='password' value={formData.password} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='password' id='confirm_password' value={formData.confirm_password} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant='primary' size='lg' type='submit'>Create Organization</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}