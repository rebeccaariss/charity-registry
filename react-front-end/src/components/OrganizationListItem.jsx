import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <Card className="h-100 shadow-sm position-relative w-85 mx-auto" style={{ background: '#f8f9fa' }}>
      <Card.Body className="d-flex flex-column">
        <div>
          <Card.Title>{org.name}</Card.Title>
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
            <span className="text-muted">Website: {org.website}</span>
            <br />
            <span className="text-muted">Address: {org.address}</span>
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
