import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../styles/Profile.css';
import { useParams } from 'react-router-dom';
import ProjectList from './ProjectList';
import ModalSmall from './ModalSmall';

const Profile = () => {
  const [organization, setOrganization] = useState({});
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const { id } = useParams(); // Using useParams to get the id

  useEffect(() => {
    fetch(`/api/organizations/${id}`)
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

  const handleOpenShipping = () => setShowShippingModal(true);
  const handleCloseShipping = () => setShowShippingModal(false);

  const handleOpenContact = () => setShowContactModal(true);
  const handleCloseContact = () => setShowContactModal(false);

  return (
    <div>
      <Card.Header className="d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
          <Image src="https://www.alignedinsurance.com/wp-content/uploads/2016/08/KW.png"
            alt="Profile" className="mt-4 mb-2 rounded-circle" fluid style={{ width: '150px', zIndex: '1' }} />
        </div>
        <div className="ms-3 d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '280px' }}>
          <Button onClick={handleOpenShipping} variant="outline-dark" style={{ height: '36px', overflow: 'visible' }}>
            Shipping
          </Button>
          <Button onClick={handleOpenContact} variant="outline-dark" style={{ height: '36px', overflow: 'visible' }}>
            Contact
          </Button>
          <h1>{organization.name}</h1>
          <a href='http://kwsphumane.ca' target='blank'>{organization.website}</a>
          <p>{organization.description}</p>

          <ModalSmall show={showShippingModal} onHide={handleCloseShipping} title="Shipping" handleShow={handleOpenShipping} />
          <ModalSmall show={showContactModal} onHide={handleCloseContact} title="Contact" handleShow={handleOpenContact} />
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
        <ProjectList/>
        <h3>Past Projects</h3>
        <Container className="py-5"/>
        <ProjectList/>
      </Card.Body>
    </div>
  );
}

export default Profile;
