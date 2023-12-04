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
    <Form onSubmit={handleSubmit}>
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
          <Col>
            {/* Button to submit the form and create the fundraiser */}
            <Button type="submit">Create Fundraiser</Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default NewFundraiserForm;

