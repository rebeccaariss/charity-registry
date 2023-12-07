import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "../styles/NewItemForm.css";

const NewItemForm = ({ projectId, onNewItem }) => {
  // State for item description input
  const [itemDescription, setItemDescription] = useState("");

  // State for quantity needed input
  const [quantityNeeded, setQuantityNeeded] = useState(0);

  // State for urgent checkbox
  const [isUrgent, setIsUrgent] = useState(false);

  // Handles the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Calls onNewItem with new item data when form is submitted
    onNewItem({ 
      project_id: projectId,
      item_description: itemDescription, 
      quantity_needed: quantityNeeded, 
      urgent: isUrgent,
      status: "Active"
    });
    // Resets form fields after submission
    setItemDescription("");
    setQuantityNeeded(0);
    setIsUrgent(false);
  };

  const handleQuantityChange = (event) => {
    // Ensuring that the quantity is non-negative
    const newQuantity = Math.max(0, parseInt(event.target.value, 10));
    setQuantityNeeded(newQuantity);
  };

  return (
    <Form onSubmit={handleSubmit} style={{padding: "5px 5px 5px 10px"}}>
      <Form.Group className="mb-4">
        <Row className="align-items-center">
          <Col xs={7}>
            {/* Input for item description */}
            <Form.Control 
              className="form-control"
              type="text" 
              value={itemDescription} 
              onChange={(e) => setItemDescription(e.target.value)} 
              placeholder="Add an item" 
            />
          </Col>
          <Col xs={2}>
            {/* Input for quantity needed */}
            <Form.Control 
              className="form-control"
              type="number" 
              value={quantityNeeded} 
              onChange={handleQuantityChange}
              placeholder="Quantity needed" 
            />
          </Col>
          <Col xs={2}>
            {/* Checkbox for marking the item as urgent */}
            <Form.Check 
              style={{ cursor: "pointer" }}
              className="mb-4 mt-4"
              type="checkbox" 
              checked={isUrgent} 
              onChange={(e) => setIsUrgent(e.target.checked)} 
              inline
              label="Urgent?"
            />
          </Col>
          <Col xs={1}>
            {/* Submission button for the form */}
            <Button style={{ margin: "20px", borderRadius: "50%", backgroundColor: "rgb(120, 156, 115)", color: "white", border: "rgb(120, 156, 115)" }} size="lg" type="submit" onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgb(100, 136, 95)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(120, 156, 115)")} className="rounded-circle">+</Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default NewItemForm;
