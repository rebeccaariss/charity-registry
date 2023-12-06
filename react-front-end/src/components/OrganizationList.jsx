import React, { useState, useEffect } from "react";
import { OrganizationListItem } from "./OrganizationListItem";
import { Row, Col } from "react-bootstrap";
import "../styles/container.css";
import { Placeholder } from "react-bootstrap";

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

  // const orgAddress = {
  //   name: organization.name,
  //   street_number: organization.street_number,
  //   street_name: organization.street_name,
  //   unit: organization.unit,
  //   city: organization.city,
  //   province: organization.province,
  //   country: organization.country,
  //   postal_code: organization.postal_code
  // };

  return (
    <div className="mt-4 mx-2 container-90" style={{ padding: "0 6%" }}>
      <Row xs={1} md={3} lg={3} className="g-4 mt-4">
        {organizations.map((org, index) => (
          <Col key={index}>
            <OrganizationListItem org={org}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}
