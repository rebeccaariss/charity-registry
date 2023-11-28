import React, { useState, useEffect } from "react";
import { OrganizationListItem } from "./OrganizationListItem";
import { Row, Col } from "react-bootstrap";
import NavBarLog from "./NavBarLog";

export function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch("/api/organizations")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOrganizations(data.organizations);
      })
      .catch((error) => {
        console.error("Error fetching organizations:", error);
      });
  }, []);

  if (organizations.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 mx-2">
      <NavBarLog />
      <Row xs={1} md={2} lg={4} className="g-4 mt-4">
        {organizations.map((org, index) => (
          <Col key={index}>
            <OrganizationListItem org={org} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
