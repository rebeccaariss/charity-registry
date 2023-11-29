import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavBarLog from '../components/NavBarLog';
import '../styles/Profile.css';

const Landing = () => {
  return (
    <div className='landing'>
      <NavBarLog />
      <Container fluid style={{marginTop: '5rem'}}>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={6}>
            <img src="https://img.freepik.com/free-vector/people-volunteering-donating-money_53876-43054.jpg?w=1800&t=st=1701269081~exp=1701269681~hmac=d56ee1cb37ee36b5a5f58c13444cfb6797f694eb9d6bd0e293dadd44f8a4ba63" alt="Charity illustration" className="img-fluid" />
          </Col>
          <Col md={6}>
            <div>
              <h1>Welcome to Charity App</h1>
              <div>Connecting organizations to donors to give them more of what they need...</div>
              <div>And none of what they don't.</div>
              <Button href="/organizations" variant="outline-secondary" className="float-end" style={{margin: '3rem'}}>See Active Organizations</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Landing;
