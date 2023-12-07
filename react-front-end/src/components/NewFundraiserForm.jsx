import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const NewFundraiserForm = ({ projectId, onCreateFundraiser }) => {
  // State for the goal amount input
  const [goalAmount, setGoalAmount] = useState(0);

  // Function to handle changes in the goal amount
  const handleGoalAmountChange = (event) => {
    // Ensuring that the goal amount is non-negative
    const newGoalAmount = Math.max(0, parseFloat(event.target.value));
    setGoalAmount(newGoalAmount);
  };

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Calls onCreateFundraiser with new fundraiser data when form is submitted
    onCreateFundraiser({
      project_id: projectId,
      amount_raised: 0.00,  // Initial amount raised set to 0.00
      goal_amount: goalAmount // The target amount for the fundraiser
    });
    // Resets the form field (goal amount) after submission
    setGoalAmount(0);
  };

  return (
    <Form onSubmit={handleSubmit} style={{padding: "5px 5px 5px 10px"}}>
      <Form.Group className="mb-4 mt-4">
        <Row className="align-items-center">
          <Col>
            {/* Input for setting the goal amount for the fundraiser */}
            <Form.Control 
              className="mb-4 mt-4"
              type="number" 
              value={goalAmount} 
              onChange={handleGoalAmountChange} 
              placeholder="Goal Amount" 
            />
          </Col>
          <Col md={2}>
            {/* Button to submit the form and create the fundraiser */}
            <Button style={{ backgroundColor: "rgb(120, 156, 115)", color: "white", border: "rgb(120, 156, 115)", marginLeft: "10px" }} size="m" type="submit" onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgb(100, 136, 95)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(120, 156, 115)")}>Create</Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default NewFundraiserForm;

