import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Image, Button, Nav } from "react-bootstrap";
import "../styles/Profile.css";
import { useParams } from "react-router-dom";
import { CreateProject } from "../components/CreateProject";
import ProjectList from "../components/ProjectList";
import ModalSmall from "../components/ModalSmall";
import { useSession } from "../providers/SessionProvider";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Profile = () => {
  const getCategoryImage = (category) => {
    return require(`../../src/assets/${imageCategories[category] || imageCategories["default"]}.png`);
  };

  const imageCategories = {
    'default': 'icon',
    'Animal Welfare': 'animal-welfare',
    'Arts & Culture': 'arts-and-culture',
    'Elderly Care': 'elderly-care',
    'Environmental': 'environmental',
    'Education': 'education',
    'Food Security': 'food-security',
    'Healthcare': 'healthcare',
    'Housing': 'housing',
    'LGBTQ+': 'lgbtq',
    'Mental Health': 'mental-health',
    'Religion & Faith': 'religious',
    'Cultural Preservation': 'cultural',
    'Disability Rights & Accessibility': 'disability-rights',
    'Community Empowerment': 'community',
    'Children\'s Welfare': 'childrens-welfare',
    'Community Development': 'community'
  };

  const [cookies, setCookie] = useCookies(["charityregistry_auth"]);
  // For accessing session data provider:
  const { session } = useSession();

  // Destructure session data
  const { role, id } = session;

  const [organization, setOrganization] = useState({});
  const [activeProjects, setActiveProjects] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const { id: requestedOrgId } = useParams(); // Using useParams to get the id

  useEffect(() => {
    const requests = [
      fetch(`/api/organizations/${requestedOrgId}`),
      fetch(`/api/organizations/${requestedOrgId}/active-projects`),
      fetch(`/api/organizations/${requestedOrgId}/past-projects`)
    ];
  
    Promise.all(requests)
      .then((responses) => {
        // Check if all responses are okay
        if (responses.some((response) => !response.ok)) {
          throw new Error("One or more fetch requests failed");
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
        console.error("Error:", error);
      });

    // Define a function to check if the current user is following the organization
    const checkFollowStatus = async () => {
      // Attempt to retrieve the user ID from cookies
      const userId = cookies.charityregistry_auth?.id;

      // Check if the user ID is available
      if (!userId) {
        // If no user ID is found, log an error and exit the function
        console.error("User ID is not available for follow ");
        return;
      }

      try {
        // Make a GET request to the server to check if the user is following the organization
        const response = await fetch(`/api/organizations/${requestedOrgId}/is-followed?userId=${userId}`);

        // Extract the "isFollowed" value from the JSON response
        const { isFollowed } = await response.json();

        // Update the "isFollowing" state based on the response
        setIsFollowing(isFollowed);
      } catch (error) {
        // If an error occurs during the fetch, log it to the console
        console.error("Failed to check follow status:", error);
      }
    };

    // Execute the checkFollowStatus function
    checkFollowStatus();
  }, [id, requestedOrgId, refreshProjects]);


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

  const handleFollowClick = async () => {
    // Retrieve the user ID from the cookies
    const userId = cookies.charityregistry_auth?.id;
    // Retrieve the organization ID from the URL parameters
    const orgId = requestedOrgId;
    // Determine the endpoint based on the current follow status
    // If the user is currently following the organization, use the unfollow endpoint, otherwise use the follow endpoint
    const endpoint = isFollowing ? "/api/organizations/unfollow-org" : "/api/organizations/follow-org";
  
    try {
      // Make a POST request to the determined endpoint
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Include the user and organization IDs in the request body
        body: JSON.stringify({ user_id: userId, org_id: orgId }),
      });
  
      // Check if the response from the server is successful
      if (response.ok) {
        // If successful, toggle the "isFollowing" state to reflect the new follow status
        setIsFollowing(!isFollowing);
      } else {
        // If the response is not successful, parse the response body to get error details
        const responseBody = await response.json();
        // Log the error details to the console
        console.error("Failed to follow/unfollow organization:", responseBody);
      }
    } catch (error) {
      // If an error occurs during the fetch (e.g., network error), log it to the console
      console.error("Error during fetch:", error);
    }
  };

  const isOrganization = cookies && cookies["charityregistry_auth"] && 
  cookies["charityregistry_auth"]["role"] === "organization" &&
  cookies["charityregistry_auth"]["id"] === requestedOrgId;
  
  return (
  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div className="profile" style={{background: "rgba(235, 235, 235, 0.95)", width: "70%", borderRadius: "0px 0px 35px 35px", marginBottom: "35px"}}>
      <Card.Header className="d-flex flex-row" style={{ background: "linear-gradient(90deg, rgba(243,229,206,0.90) 0%, rgba(207,218,164,0.90) 35%, rgba(170,205,170,0.90) 67%)", backgroundSize: "cover", height: "15rem", position: "relative", borderRadius: "35px 35px 0px 0px" }}>
        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: "150px" }}>
          <div style={{ marginTop: "6rem" }}>
            <img src={getCategoryImage(organization.category)} alt={organization.category} className="mt-4 mb-2 rounded-circle" fluid style={{ width: "150px", zIndex: "1", marginLeft: "5px" }} />
          </div>
        </div>
        <div className="info-buttons" style={{ position: "absolute", right: "10px", zIndex: "1", marginTop: "375px", marginRight: "100px", width: "300px" }}>
          <Row className="mb-4">
            <Col md={4}>
              <Button onClick={handleOpenShipping} variant="outline-dark" style={{ height: "36px", width: '90px', overflow: "visible", margin: "5px" }}>
                Shipping
              </Button>
            </Col>
            <Col md={4}>
              <Button onClick={handleOpenContact} variant="outline-dark" style={{ height: "36px", width: '90px', overflow: "visible", marginLeft: "5px", margin: "5px" }}>
                Contact
              </Button>
            </Col>
            <Col md={4}>
              <div>
                {
                  isOrganization ? 
                  <Link to={`/orgedit/${requestedOrgId}`}>
                    <Button variant='secondary' style={{ height: '36px', width: '90px', overflow: 'visible', margin: "5px" }}>
                      Edit
                    </Button>
                  </Link> :
                  <Button
                    variant='secondary'
                    style={{ height: '36px', width: '90px', overflow: 'visible', margin: "5px" }}
                    onClick={handleFollowClick}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                }
              </div>
            </Col>
          </Row>
        </div>
      </Card.Header>
      <div className="ms-3 d-flex flex-column justify-content-center align-items-center" style={{ marginTop: "10px" }}>
        <div className="ms-3 d-flex flex-column justify-content-center align-items-center">
          <h1 style={{fontFamily: "'Playfair Display', serif", fontWeight: "600", fontSize: "50px"}}>{organization.name}</h1>
          <a href="http://kwsphumane.ca" target="blank" style={{fontFamily: "'Playfair Display', serif", fontSize: "22px"}}>{organization.website}</a>
          {/* <p style={{padding: "70px 0px 0px 30px", fontStyle: "italic", fontSize: "18px", textAlign: "center"}}>{organization.description}</p> */}
        </div>
        <ModalSmall show={showShippingModal} onHide={handleCloseShipping} title="Shipping" handleShow={handleOpenShipping} shippingInfo={orgAddress} />
        <ModalSmall show={showContactModal} onHide={handleCloseContact} title="Contact" handleShow={handleOpenContact} orgEmail={organization.email} orgPhone={organization.phone} />
      </div>
      <Card.Body className="text-black p-4" style={{padding: "0px", marginTop: "30px"}}>
        <div className="projects">
          {isOrganization &&
            <CreateProject setRefreshProjects={setRefreshProjects} />
          }
          <h2 className="projects-header">Active Projects</h2>
          <ProjectList projects={activeProjects}/>
          <h2 className="projects-header">Past Projects</h2>
          <ProjectList projects={pastProjects}/>
        </div>
      </Card.Body>
    </div>
  </div>
);
}

export default Profile;
