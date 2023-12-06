import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const DonationListItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const customBorderStyle = {
    padding: "25px",
    marginBottom: "1rem",
    borderRadius: "5px",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    width: "100%",
    margin: "0 auto",
    boxShadow: isHovered
    ? "0px 3px 8px 0px rgba(95, 102, 92,1)" 
    : "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
  };

  const containerStyle = {
    marginBottom: "20px",
  };

  const textStyle = {
    listStyle: "none",
    paddingLeft: "0",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };

  const descriptionStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    color: "rgba(95, 102, 92,1)",
  };

  const iconStyle = {
    fontSize: "48px",
    marginRight: "10px",
    color: "rgba(95, 102, 92,1)",
  };

  const ratioStyle = {
    marginLeft: "auto",
    marginRight: "15px",
    color: "rgba(95, 102, 92,1)",
  };
  
  const titleStyle = {
    color: "rgba(95, 102, 92,1)",
    fontWeight: "600",
    fontFamily: "'Playfair Display', serif",
    fontSize: "30px"
  };

  // calculate the ratio of quantity donated to quantity needed
  const { quantity_donated, quantity_needed } = props.donation;
  const donationRatio = `${quantity_donated} Donated / ${quantity_needed} total`;

  return (
    <div
      className="bg-white p-3 rounded"
      style={customBorderStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <li
        className="bd-white p-3 rounded"
        style={containerStyle}
        key={props.donation.id}
      >
        <FontAwesomeIcon icon={faHandHoldingHeart} style={iconStyle} />
        <div style={textStyle}>
          <div style={descriptionStyle}>
            <h5>{props.donation["item_description"]}</h5>
            <h6 style={ratioStyle}>{donationRatio}</h6>
          </div>
          <h6 style={titleStyle}>{props.donation["project_name"]}</h6>
          <p style={titleStyle}>{props.donation["organization_name"]}</p>
          {/* <p>{props.donation["quantity_donated"]}</p>
          <p>{props.donation["quantity_needed"]}</p> */}
          <p>{props.donation["donation_date"]}</p>
        </div>
      </li>
    </div>
  );
};

export default DonationListItem;
