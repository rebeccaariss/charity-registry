import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../styles/Profile.css';
import { useParams } from 'react-router-dom';
import ProjectList from '../components/ProjectList';
import ModalSmall from '../components/ModalSmall';

const Profile = () => {
  const [organization, setOrganization] = useState({});
  const [activeProjects, setActiveProjects] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const { id } = useParams(); // Using useParams to get the id

  useEffect(() => {
    const requests = [
      fetch(`/api/organizations/${id}`),
      fetch(`/api/organizations/${id}/active-projects`),
      fetch(`/api/organizations/${id}/past-projects`)
    ];
  
    Promise.all(requests)
      .then((responses) => {
        // Check if all responses are okay
        if (responses.some((response) => !response.ok)) {
          throw new Error('One or more fetch requests failed');
        }
        // Parse each response as JSON
        return Promise.all(responses.map((response) => response.json()));
      })
      .then(([organization, activeProjects, pastProjects]) => {
        // Set state or perform other actions with the fetched data
        setOrganization(organization.organization[0]);
        setActiveProjects(activeProjects);
        setPastProjects(pastProjects);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  const handleOpenShipping = () => setShowShippingModal(true);
  const handleCloseShipping = () => setShowShippingModal(false);

  const handleOpenContact = () => setShowContactModal(true);
  const handleCloseContact = () => setShowContactModal(false);

  return (
    <div className='profile'>
      <Card.Header className='d-flex flex-row' style={{ backgroundColor: '#000', height: '200px', position: 'relative' }}>
        <div className='ms-4 mt-5 d-flex flex-column' style={{ width: '150px' }}>
          <Image src='https://www.alignedinsurance.com/wp-content/uploads/2016/08/KW.png'
            alt='Profile' className='mt-4 mb-2 rounded-circle' fluid style={{ width: '150px', zIndex: '1' }} />
        </div>
        <div className='info-buttons'>
          <Button onClick={handleOpenShipping} variant='outline-dark' style={{ height: '36px', overflow: 'visible' }}>
            Shipping
          </Button>
          <Button onClick={handleOpenContact} variant='outline-dark' style={{ height: '36px', overflow: 'visible' }}>
            Contact
          </Button>
        </div>
        <div className='ms-3 d-flex flex-column justify-content-center align-items-center' style={{ marginTop: '280px' }}>
          <h1>{organization.name}</h1>
          <a href='http://kwsphumane.ca' target='blank'>{organization.website}</a>
          <p>{organization.description}</p>
          <ModalSmall show={showShippingModal} onHide={handleCloseShipping} title='Shipping' handleShow={handleOpenShipping} shippingInfo={organization.address} />
          <ModalSmall show={showContactModal} onHide={handleCloseContact} title='Contact' handleShow={handleOpenContact} orgEmail={organization.email} orgPhone={organization.phone} />
        </div>
      </Card.Header>
      <Card.Body className='text-black p-4' style={{ marginTop: '100px' }}>
        <div className='d-flex justify-content-end'>
          <Button variant='outline-dark' style={{ height: '36px', overflow: 'visible' }}>
            Follow
          </Button>
        </div>
        <div className='projects'>
          <h3>Active Projects</h3>
          <ProjectList projects={activeProjects}/>
          <h3>Past Projects</h3>
          <ProjectList projects={pastProjects}/>
        </div>
      </Card.Body>
    </div>
  );
}

export default Profile;