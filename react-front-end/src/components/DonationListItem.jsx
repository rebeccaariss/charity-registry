import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const DonationListItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const customBorderStyle = {
    background: "rgb(255, 255, 255)",
    marginBottom: "1rem",
    borderRadius: "5px",
    transition: "transform 0.3s ease-in-out",
    width: "60%",
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
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "25px",
  };

  const descriptionStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  };

  const ratioStyle = {
    marginLeft: "auto",
    marginRight: "15px",
    color: "#rgb(62, 62, 62)",
  };

  const titleStyle = {
    color: "rgb(62, 62, 62)",
    fontWeight: "600",
    fontFamily: "'Playfair Display', serif",
    fontSize: "30px",
    marginTop: "5px"
  };

  // calculate the ratio of quantity donated to quantity needed
  const { quantity_donated, quantity_needed } = props.donation;
  const donationRatio = `${quantity_donated} Donated / ${quantity_needed} total`;

  return (
    <div style={containerStyle}>
      <li
        className="bd-white p-3 rounded"
        style={customBorderStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        key={props.donation.id}
      >
        <div style={textStyle}>
          <div style={descriptionStyle}>
            <h5 style={titleStyle}>
              <FontAwesomeIcon icon={faHandHoldingHeart} style={{marginRight: "10px"}}/>
              {props.donation["item_description"]}
            </h5>
            <h6 style={ratioStyle}>{donationRatio}</h6>
          </div>
          <p style={{marginBottom: "20px", marginLeft: "48px"}}>{props.donation["donation_date"]}</p>
          <p style={{marginBottom: "0", marginLeft: "47px"}}><strong>Organization:</strong> {props.donation["organization_name"]}</p>
          <p style={{marginBottom: "0", marginLeft: "47px"}}><strong>Project:</strong> {props.donation["project_name"]}</p>
          {/* <p>{props.donation["quantity_donated"]}</p>
          <p>{props.donation["quantity_needed"]}</p> */}
        </div>
      </li>
    </div>
  );
};

export default DonationListItem;
