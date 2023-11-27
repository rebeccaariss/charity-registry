import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const DonationListItem = (props) => {
  
  const customBorderStyle = {
    border: "2.3px solid #602060",
    padding: "25px",
    marginBottom: "1rem",
    borderRadius: "5px",
    transition: "transform 0.3s ease-in-out",
    width: "50%",
    margin: "0 auto",
    height: "auto",
    display: "flex",
    alignItems: "center",
   justifyContent: "space-between",
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
    color: "#602060",
  };


  const iconStyle = {
    fontSize: "48px",
    marginRight: "10px",
    color: "#602060",
  };

  const ratioStyle = {
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "15px",
    color: "#602060",
  };


  // calculate the ratio of quantity donated to quantity needed
  const { quantity_donated, quantity_needed } = props.donation;
  const donationRatio = `${quantity_donated} / ${quantity_needed}`;

  return (
    <div style={containerStyle}>
      <li
        className="bd-white p-3 rounded"
        style={customBorderStyle}
        key={props.donation.id}
      >
        <FontAwesomeIcon icon={faHandHoldingHeart} style={iconStyle} />
        <div style={textStyle}>
          <div style={descriptionStyle}>
          <h5>{props.donation["item_description"]}</h5>
          <h5 style={ratioStyle}>{donationRatio}</h5>
          </div>
          <h6>{props.donation["project_name"]}</h6>
          <p>{props.donation["organization_name"]}</p>
          {/* <p>{props.donation["quantity_donated"]}</p>
          <p>{props.donation["quantity_needed"]}</p> */}
          <p>{props.donation["donation_date"]}</p>
        </div>
      </li>
    </div>
  );
};

export default DonationListItem;
