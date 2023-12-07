import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export function CreateProject({ setRefreshProjects }) {
  const { id } = useParams();; // grabs orgs id 
  const [project, setProject] = useState({
    name: "",
    description: ""
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
      const response = await fetch("/api/organizations/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log('Project created:', data);
      setRefreshProjects(prev => !prev);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center">
      <Card className="text-black m-5" style={{ width: "100%", borderRadius: "20px", padding: "0.5rem", boxShadow: "0 0 7px #ccccc" }}>
        <Card.Body>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={11}>
                {/* Organization Information */}
                <Form.Group className="mb-4">
                  <Form.Control type="text" placeholder="Title" id="name" name="name" value={project.name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control type="text" placeholder="Description" id="description" name="description" value={project.description} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col className="d-flex align-items-center">
                <Button style={{ borderRadius: "50%", backgroundColor: "rgb(120, 156, 115)", color: "white", border: "rgb(120, 156, 115)" }} size="lg" type="submit" onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgb(100, 136, 95)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(120, 156, 115)" )}>+</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}