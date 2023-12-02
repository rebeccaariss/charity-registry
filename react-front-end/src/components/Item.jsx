import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Item = ({ item, onDonate, donationAmount, updateDonationAmount, toggleDonationInput, selectedItemId, onDelete }) => {

  if (!item) {
    return null; // Render nothing if item is undefined
  }

  return (
    <div>
      <span onClick={() => toggleDonationInput(item.id)} style={{cursor: "pointer"}}>
        {item.item_description} - {item.quantity_donated}/{item.quantity_needed} donated
      </span>
      <span onClick={() => onDelete(item.id)} style={{ cursor: "pointer" }}>
  <FontAwesomeIcon icon={faTimes} />
    </span>
      {selectedItemId === item.id && (
        <div>
          <input 
            type="number" 
            value={donationAmount[item.id] || ''}
            onChange={(e) => updateDonationAmount(item.id, e.target.value)}
            placeholder="Enter amount"
          />
          <button onClick={() => onDonate(item.id)}>
            Donate
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;
