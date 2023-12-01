import React, { useState } from 'react';

const NewItemForm = ({ projectId, onNewItem }) => {
  // State for item description input
  const [itemDescription, setItemDescription] = useState('');

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
      status: "New"
    });
    // Resets form fields after submission
    setItemDescription('');
    setQuantityNeeded(0);
    setIsUrgent(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input for item description */}
      <input 
        type="text" 
        value={itemDescription} 
        onChange={(e) => setItemDescription(e.target.value)} 
        placeholder="Item Description" 
      />
      {/* Input for quantity needed */}
      <input 
        type="number" 
        value={quantityNeeded} 
        onChange={(e) => setQuantityNeeded(e.target.value)} 
        placeholder="Quantity Needed" 
      />
      {/* Checkbox for marking the item as urgent */}
      <label>
        Urgent:
        <input 
          type="checkbox" 
          checked={isUrgent} 
          onChange={(e) => setIsUrgent(e.target.checked)} 
        />
      </label>
      {/* Submission button for the form */}
      <button type="submit">Add Item</button>
    </form>
  );
};

export default NewItemForm;
