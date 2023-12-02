import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      {/* Input for setting the goal amount for the fundraiser */}
      <input 
        type="number" 
        value={goalAmount} 
        onChange={handleGoalAmountChange} 
        placeholder="Goal Amount" 
      />
      {/* Button to submit the form and create the fundraiser */}
      <button type="submit">Create Fundraiser</button>
    </form>
  );
};

export default NewFundraiserForm;

