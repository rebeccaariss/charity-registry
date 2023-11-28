import React, { useState, useEffect } from 'react';
import { OrganizationListItem } from '../components/OrganizationListItem';
import { Row, Col } from 'react-bootstrap';

export function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch('/api/organizations')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error! ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setOrganizations(data.organizations); 
      })
      .catch(error => {
        console.error('Error fetching organizations:', error);
      });
  }, []);

  if (organizations.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      {organizations.map((org, index) => (
        <Col md={2} key={index} className="mb-3">
          <OrganizationListItem org={org} />
        </Col>
      ))}
    </Row>
  );
}
