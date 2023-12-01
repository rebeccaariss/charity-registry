import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import bannerImage from "../../src/assets/banner.png";
import iconImage from "../../src/assets/icon.png";
import "../styles/banner.css";

export function OrganizationListItem({ org }) {
  const profilePath = `/profile/${org.id}`;

  const activeReuestsStyle = {
    color: "green",
    fontWeight: "bold",
  };

  const urgentRequestsStyle = {
    color: "red",
    fontWeight: "bold",
  };

  const websiteStyle = {
    color: "black",
    fontWeight: 500, 
    fontStyle: "italic",
  };

  const addressStyle = {
    color: "black",
    fontWeight: 500, 
    fontStyle: "italic",
  };

  return (
    <Card className="h-100 shadow-lg position-relative w-85 mx-auto" style={{ background: '#f8f9fa' }}>
      <img src={bannerImage} className="card-banner" alt="banner" />  
      <Card.Body className="d-flex flex-column">
        <div>
          <div className=" d-flex align-items-center">
            <img src={iconImage} className="icon" alt="icon" />
          <Card.Title>{org.name}</Card.Title>
          </div>
          <Card.Subtitle className="mb-2 text-muted">
            {org.category}
          </Card.Subtitle>

          <Card.Text>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="fa-light fa-circle-exclamation fa-fade fa-xs mr-1 text-danger"
            />
            <strong style={urgentRequestsStyle}>
              {" "}
              {org.urgent_requests} urgent requests
            </strong>
            <br />
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              style={{ marginRight: "10px", color: "green" }}
            />
            <strong style={activeReuestsStyle}>
              {org.active_requests} active requests
            </strong>
          </Card.Text>

          <Card.Text>
            <span className="text-muted"><i style={websiteStyle}>Website: </i> <br/>{org.website}</span>
            <br />
            <span className="text-muted"><i style={addressStyle}>Address: </i> <br/>{org.address}</span>
          </Card.Text>
          <Card.Text>{org.bio}</Card.Text>
        </div>
        {/* TODO: hook up profile path */}
        <Link
          to={profilePath}
          className="btn btn-link position-absolute bottom-0 end-0 m-1"
        >
          Read More
        </Link>
        
      </Card.Body>
    </Card>
  );
}
