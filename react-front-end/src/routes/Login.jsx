import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

      } else {
        // TODO: Add bootstrap alert here
        console.error('Invalid credentials');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container fluid>
      <Card className='text-black m-5' style={{ borderRadius: '25px', padding: '1rem' }}>
      <Card.Title className="text-center">Log in</Card.Title>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
              <Row className='mb-4'>
              {/* Email */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' value={credentials.email} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            {/* Password */}
            <Row className='mb-4'>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' name='password' value={credentials.password} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant='primary' size='lg' type='submit'>Log in</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;