import React from "react";
import Item from "./Item";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const ProjectListItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const customBorderStyle = {
    border: "2.3px solid #602060",
    padding: "25px",
    marginBottom: "1rem",
    borderRadius: "5px",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    width: "80%",
    margin: "0 auto",
    boxShadow: isHovered
      ? "0px 3px 8px 0px #602060"
      : "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
  };

  const containerStyle = {
    marginBottom: "20px",
  };

  const titleStyle = {
    color: "#602060",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
  };
  const descriptionStyle = {
    textAlign: "justify",
  };

  return (
    <div style={containerStyle}>
      <div
        className="bg-white p-3 rounded"
        style={customBorderStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 style={titleStyle}>
          <FontAwesomeIcon
            icon={faHandHoldingHeart}
            style={{ marginRight: "10px" }}
          />
          {props.project["name"]}
        </h2>
        <p className="text-muted" style={descriptionStyle}>
          {props.project["description"]}
        </p>
        <ul className="list-unstyled bg-white p-3 rounded-bottom">
          <Item item={props.project["items"][0]} />
        </ul>
      </div>
    </div>
  );
};

export default ProjectListItem;
