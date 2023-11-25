import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Item = ({ item }) => {
  const customBorderStyle = {
    border: "2.3px solid #aaa1a1",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "5px",
  };

  return (
    <li key={item.id} style={customBorderStyle}>
      <p className="mb-1">
        <strong className="item-name-hover">Item Description: </strong>{" "}
        {item.item_description}
      </p>
      <p className="mb-1">
        <strong>Quantity Needed: </strong> {item.quantity_needed}
      </p>
      <p className="mb-0">
        {item.urgent && (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="fa-light fa-circle-exclamation fa-fade fa-xs mr-1"
          />
        )}
        <strong> Urgent: </strong>
        {item.urgent ? "Yes" : "No"}
      </p>
      <p className="mb-0">
        <strong>Item Price: </strong>
        {item.item_price ? `$${item.item_price}` : "N/A"}
      </p>
    </li>
  );
};

export default Item;
