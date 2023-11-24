import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../styles/Profile.css';

const Profile = () => {
  const [organization, setOrganization] = useState();

  useEffect(() => {
    fetch('/api/organizations/3')
      .then(response => {
        if (!response.ok) {
          throw new Error(`error! ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setOrganization(data.organization[0]);
      })
      .catch(error => {
        console.error('Error fetching organization:', error);
      });
  }, []);

  return (
    <div>
      <Card.Header className="d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
          <Image src="https://www.alignedinsurance.com/wp-content/uploads/2016/08/KW.png"
            alt="Profile" className="mt-4 mb-2 rounded-circle" fluid style={{ width: '150px', zIndex: '1' }} />
        </div>
        <div className="ms-3 d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '280px' }}>
          <h1>Kitchener-Waterloo Humane Society</h1>
          <a href='http://kwsphumane.ca' target='blank'>http://kwsphumane.ca</a>
          <p>The Humane Society of Kitchener-Waterloo is dedicated to giving animals a loving forever home where they will receive the care they need.</p>
        </div>
      </Card.Header>
      <Card.Body className="text-black p-4" style={{ marginTop: '100px' }}>
        <div className="d-flex justify-content-end">
          <Button variant="outline-dark" style={{ height: '36px', overflow: 'visible' }}>
            Follow
          </Button>
        </div>
        <h3>Active Projects</h3>
        <Container className="py-5"/>
        {/* ProjectList Component */}
        <h3>Past Projects</h3>
        <Container className="py-5"/>
        {/* ProjectList Component */}
      </Card.Body>
    </div>
  );
}

export default Profile;
