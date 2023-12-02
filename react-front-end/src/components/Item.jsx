import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Item = ({ item, onDonate, donationAmount, updateDonationAmount, toggleDonationInput, selectedItemId, onDelete }) => {
  if (!item) {
    return null; 
  }

  const isGoalReached = item.quantity_donated >= item.quantity_needed;

  return (
    <div>
      <span onClick={() => !isGoalReached && toggleDonationInput(item.id)} style={{ cursor: "pointer", textDecoration: isGoalReached ? "line-through" : "none" }}>
        {item.item_description} - {item.quantity_donated}/{item.quantity_needed} donated
      </span>
      {!isGoalReached && (
        <>
          <span onClick={() => onDelete(item.id)} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          {selectedItemId === item.id && (
            <div>
              <input 
                type="number" 
                value={donationAmount[item.id] || ''}
                onChange={(e) => updateDonationAmount(item.id, Number(e.target.value))}
                placeholder="Enter amount"
              />
              <button onClick={() => onDonate(item.id)}>
                Donate
              </button>
            </div>
          )}
        </>
      )}
      {isGoalReached && <p style={{ color: 'green' }}>Donation goal reached!</p>}
    </div>
  );
};

export default Item;

