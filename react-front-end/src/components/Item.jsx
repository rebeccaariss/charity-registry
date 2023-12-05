import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form, Button } from "react-bootstrap";

const Item = ({ item, onDonate, donationAmount, updateDonationAmount, toggleDonationInput, selectedItemId, onDelete, isOrgOwner, isExpanded, onItemClick }) => {

  const urgentStyle = {
    color: "rgb(184, 79, 79)", 
    fontWeight: 500, 
    fontStyle: "italic", 
  };

  if (!item) {
    return null; 
  }

  const isGoalReached = item.quantity_donated >= item.quantity_needed;

  return (
    // This entire div represents one item in the project:
    <div onClick={() => onItemClick(item.id)}>
      <span className="material-symbols-outlined">
        {isExpanded ? "arrow_drop_down" : "arrow_right"}
      </span>
      <span onClick={() => !isGoalReached && toggleDonationInput(item.id)} style={{ cursor: "pointer", textDecoration: isGoalReached ? "line-through" : "none" }}>
        {item.item_description} - {item.quantity_donated}/{item.quantity_needed} donated
      </span>
      
      {/* Conditionally render the delete icon only for organization owners */}
      {isOrgOwner && !isGoalReached && (
        <span onClick={() => onDelete(item.id)} style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      )}
      {item.urgent && (
        <span style={urgentStyle}>
          <FontAwesomeIcon icon={faExclamationCircle} />
          {' '}
        </span>
      )}
      {/* Conditionally render the donation input field only for non-organization owners */}
      {!isOrgOwner && !isGoalReached && selectedItemId === item.id && (
        <div>
          <Row>
            <Col>
              <Form.Control 
                type="number" 
                value={donationAmount[item.id] || ''}
                onChange={(e) => updateDonationAmount(item.id, Number(e.target.value))}
                placeholder="Enter amount"
              />
            </Col>
            <Col>
              <Button onClick={() => onDonate(item.id)}>
                Donate
              </Button>
            </Col>
          </Row>
        </div>
      )}
      
      {isGoalReached && <p style={{ color: 'green' }}>Donation goal reached!</p>}
    </div>
  );
};


export default Item;

