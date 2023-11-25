import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export function OrganizationListItem({ org }) {
  const profilePath = "/";
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{org.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{org.category}</Card.Subtitle>

        <Card.Text>
          <strong>{org.urgent_requests} urgent requests</strong><br />
          <strong>{org.active_requests} active requests</strong>
        </Card.Text>
        
        <Card.Text>{org.website}</Card.Text>
        <Card.Text>{org.address}</Card.Text>
        <Card.Text>{org.bio}</Card.Text>
        {/* TODO: hook up profile path */}
        <Link to={profilePath} className="btn btn-link">Read More</Link>
      </Card.Body>
    </Card>
  );
}
