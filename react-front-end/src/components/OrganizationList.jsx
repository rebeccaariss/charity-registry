import React, { useState, useEffect } from "react";
import { OrganizationListItem } from "./OrganizationListItem";
import { Row, Col } from "react-bootstrap";
import "../styles/container.css";

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
    <div className="mt-4 mx-2 container-90" style={{ padding: "0 6%" }}>
      <Row xs={1} md={3} lg={3} className="g-4 mt-4">
        {organizations.map((org, index) => (
          <Col key={index}>
            <OrganizationListItem org={org} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
