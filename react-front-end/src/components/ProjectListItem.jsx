import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const ProjectListItem = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculating total items needed and total donated
  const totalItemsNeeded = project.items.reduce((total, item) => total + item.quantity_needed, 0);
  const totalItemsDonated = project.items.reduce((total, item) => {
    const donated = parseInt(item.quantity_donated, 10) || 0;
    return total + donated;
  }, 0);

  const customBorderStyle = {
    // border: "2.3px solid #602060",
    border: "linear-gradient(45deg, #562262, #693eeb)",
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
        <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div>
            <h2 style={titleStyle}>
              <FontAwesomeIcon
                icon={faHandHoldingHeart}
                style={{ marginRight: "10px" }}
              />
              {project.name}
            </h2>
            <p className="text-muted" style={descriptionStyle}>
              {project.description}
            </p>
            <div>
              <strong>Total Items Needed:</strong> {totalItemsNeeded}
            </div>
            <div>
              <strong>Total Donated:</strong> {totalItemsDonated}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectListItem;
