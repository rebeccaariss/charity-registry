import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Image, Button, Nav } from 'react-bootstrap';
import '../styles/Profile.css';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import NavBarLog from '../components/NavBarLog';
import { CreateProject } from '../components/CreateProject';
import ProjectList from '../components/ProjectList';
import ModalSmall from '../components/ModalSmall';
import { useSession } from '../providers/SessionProvider';
import { useCookies } from 'react-cookie';

const Profile = () => {
  const [cookies, setCookie] = useCookies(['charityregistry_auth']);
  // For accessing session data provider:
  const { session } = useSession();

  // Destructure session data
  const { role, id } = session;

  const [organization, setOrganization] = useState({});
  const [activeProjects, setActiveProjects] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const { id: requestedOrgId } = useParams(); // Using useParams to get the id

  useEffect(() => {
    // console.log(cookies["charityregistry_auth"]["role"])
    const requests = [
      fetch(`/api/organizations/${requestedOrgId}`),
      fetch(`/api/organizations/${requestedOrgId}/active-projects`),
      fetch(`/api/organizations/${requestedOrgId}/past-projects`)
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

  const orgAddress = {
    name: organization.name,
    street_number: organization.street_number,
    street_name: organization.street_name,
    unit: organization.unit,
    city: organization.city,
    province: organization.province,
    country: organization.country,
    postal_code: organization.postal_code
  };

  return (
    <>
    <div className='profile'>
      <NavBar/>
      <Card.Header className='d-flex flex-row' style={{ backgroundImage: 'url("/assets/banner.png")', backgroundSize: 'cover', height: '200px', position: 'relative' }}>
        <div className='ms-4 mt-5 d-flex flex-column' style={{ width: '150px' }}>
          <Image src='/assets/icon.png'
            alt='Profile' className='mt-4 mb-2 rounded-circle' fluid style={{ width: '150px', zIndex: '1' }} />
        </div>
      </Card.Header>
      <div className='info-buttons' style={{ position: 'absolute', right: '10px', zIndex: '1' }}>
          <Button onClick={handleOpenShipping} variant='outline-dark' style={{ height: '36px', overflow: 'visible' }}>
            Shipping
          </Button>
          <Button onClick={handleOpenContact} variant='outline-dark' style={{ height: '36px', overflow: 'visible', marginLeft: '10px' }}>
            Contact
          </Button>
        </div>
        <div className='ms-3 d-flex flex-column justify-content-center align-items-center' style={{ marginTop: '5px' }}>
          {cookies["charityregistry_auth"]["id"] === requestedOrgId && cookies["charityregistry_auth"]["role"] === "organization" ?
          <h1>It's working!</h1>
          :
          <h1>{organization.name}</h1>
          }
          <p>{cookies["charityregistry_auth"]["id"]}</p>
          <p>{cookies["charityregistry_auth"]["role"]}</p>
          <a href='http://kwsphumane.ca' target='blank'>{organization.website}</a>
          <p>{organization.description}</p>
          <ModalSmall show={showShippingModal} onHide={handleCloseShipping} title='Shipping' handleShow={handleOpenShipping} shippingInfo={orgAddress} />
          <ModalSmall show={showContactModal} onHide={handleCloseContact} title='Contact' handleShow={handleOpenContact} orgEmail={organization.email} orgPhone={organization.phone} />
        </div>
      <Card.Body className='text-black p-4'>
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
    </>
  );
}

export default Profile;
