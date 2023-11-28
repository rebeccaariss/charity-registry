import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export function CreateProject() {
  const { id } = useParams();; // grabs orgs id 
  console.log('id:', id);
  const [project, setProject] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const projectData = {
      ...project,
      org_id: id, // puts org id into the request
    };

    try {
      const response = await fetch('/api/organizations/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Project created:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container fluid>
      <Card className='text-black m-5' style={{ borderRadius: '25px', padding: '1rem' }}>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* Organization Information */}
            <Form.Group className='mb-4'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' id='name' name='name' value={project.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' id='description' name='description' value={project.description} onChange={handleInputChange} />
            </Form.Group>
            <Button variant='primary' size='lg' type='submit'>Create project</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}