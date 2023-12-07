import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const ProjectListItem = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculating total items needed and total donated
  const totalItemsNeeded = project.items ? project.items.reduce((total, item) => total + item.quantity_needed, 0) : 0;
  const urgentItemsCount = project.items ? project.items.reduce((count, item) => {
    return item.urgent ? count + 1 : count;
  }, 0) : 0;

  const customBorderStyle = {
    marginBottom: "1rem",
    borderRadius: "25px",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    width: "90%",
    margin: "0 auto",
    boxShadow: isHovered
    ? "0px 3px 8px 0px rgba(95, 102, 92,1)" 
    : "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
  };

  const containerStyle = {
    marginBottom: "20px"
  };

  const titleStyle = {
    color: "rgb(62, 62, 62)",
    fontWeight: "600",
    fontFamily: "'Playfair Display', serif",
    fontSize: "30px"
  };

  const descriptionStyle = {
    textAlign: "justify",
    marginLeft: "45px"
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
          <div style={{padding: "30px"}}>
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
            <div style={{marginLeft: "47px"}}>
              <strong>Total Items Needed:</strong> {totalItemsNeeded}
            </div>
            <div style={{marginLeft: "47px"}}>
              <strong>Urgent Items:</strong> {urgentItemsCount}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectListItem;
