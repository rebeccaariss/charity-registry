import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "../styles/ProjectExpanded.css";
import { useParams, useNavigate } from "react-router-dom";
import FundraiserProgressBar from "./FundraiserProgressBar";
import Item from "./Item";
import NewItemForm from "./NewItemForm";
import NewFundraiserForm from "./NewFundraiserForm";
import { useCookies } from "react-cookie";
import { faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Utility function for formatting dates
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export function ProjectExpanded() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(['charityregistry_auth']);
 //Destructure role and id from cookie session if nothing is found they are empty objects
  const { role, id: sessionId } = cookies.charityregistry_auth || {};

  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleItemClick = (itemId) => {
    setExpandedItemId((prevExpandedItemId) =>
      prevExpandedItemId === itemId ? null : itemId
    );
  };

  // State for storing project details ie name description
  const [projectDetails, setProjectDetails] = useState(null);

  // State for storing list of items  that belong to that project
  const [items, setItems] = useState([]);

  // State for tracking the currently selected item for donation
  const [selectedItemId, setSelectedItemId] = useState(null);

  // State for managing donation amounts for each item
  const [ItemDonationAmount, setItemDonationAmount] = useState({});

  // State for controlling the visibility of the modal
  const [showModal, setShowModal] = useState(true);

  // State for storing fundraiser data (amount raised and goal)
  const [fundraiserData, setFundraiserData] = useState({ amount_raised: 0, goal_amount: 0 });

  // State for storing the new donation amount for the fundraiser
  const [newFundDonation, setNewFundDonation] = useState("");

  const [isOrgOwner, setIsOrgOwner] = useState(false);

  const [fundraiserExists, setFundraiserExists] = useState(false);


// Fetches project details and items
const fetchProjectDetailsAndItems = async () => {
  try {
    const response = await fetch(`/api/projects/${id}`);
    const data = await response.json();
    setProjectDetails(data.project);
    setItems(data.items);
    
    // Set isOrgOwner based on fetched org_id, sessionId from cookies, and the role
    const isUserOrgOwner = role === "organization" && data.project.org_id === parseInt(sessionId);
    setIsOrgOwner(isUserOrgOwner);
  } catch (error) {
    console.error("Error fetching project details and items:", error);
  }
};

  // Fetches fundraiser data
  const fetchFundraiserData = () => {
    fetch(`/api/fundraisers/project/${id}`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => setFundraiserData({
        amount_raised: parseFloat(data.amount_raised) || 0,
        goal_amount: parseFloat(data.goal_amount) || 0,
      }))
      .catch(error => console.error("Error fetching fundraiser data:", error));
  };

  // Handles adding a new item to project
  const handleNewItem = async (newItemData) => {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItemData),
      });
      if (!response.ok) throw new Error("Failed to add new item");
      fetchProjectDetailsAndItems();
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  // Handles creating a new fundraiser for project
  const handleCreateFundraiser = async (fundraiserData) => {
    try {
      const response = await fetch("/api/fundraisers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fundraiserData),
      });
      if (!response.ok) throw new Error("Failed to create new fundraiser");
      setFundraiserExists(true)
      fetchFundraiserData();
    } catch (error) {
      console.error("Error creating new fundraiser:", error);
    }
  };

  // Handles users donating items updating the database
  const handleItemDonate = async (itemId) => {
    const amount = ItemDonationAmount[itemId] || 0;
    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: sessionId, itemId: itemId, quantityDonated: amount }),
      });
      if (response.ok) {
        fetchProjectDetailsAndItems();
      } else {
        throw new Error((await response.json()).error);
      }
    } catch (error) {
      console.error("Donation failed:", error);
    }
  };

  // Handles users fundraiser donations updating the database
  const handleFundraiserDonate = () => {
    const updatedAmount = parseFloat(fundraiserData.amount_raised) + parseFloat(newFundDonation);
    fetch(`/api/fundraisers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount_raised: updatedAmount })
    })
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      setFundraiserData(prevData => ({
        ...prevData,
        amount_raised: updatedAmount
      }));
      setNewFundDonation("");
    })
    .catch(error => console.error("Error submitting donation:", error));
  };

//handles sending a delete request to the back end on selected item id
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        fetchProjectDetailsAndItems(); // Refresh the items list after deletion
      } else {
        throw new Error((await response.json()).error);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  

  // Function to toggle the visibility of the donation input for a specific item.
  // If the selected item is clicked again, it hides the input, otherwise, it shows it.
  const toggleDonationInput = (itemId) => {
    setSelectedItemId(selectedItemId === itemId ? null : itemId);
  };

  // Function to update the donation amount for a specific item.
  // Keeps track of how much the user wants to donate to each item.
  const updateItemDonationAmount = (itemId, enteredAmount) => {
    const item = items.find(itm => itm.id === itemId);
    if (item) {
      const remainingAmount = item.quantity_needed - item.quantity_donated;
      const validAmount = Math.max(0, Math.min(remainingAmount, enteredAmount));
      setItemDonationAmount({ ...ItemDonationAmount, [itemId]: validAmount });
    }
  };
  

// Function to handle changes in the donation input for the overall fundraiser.
// Updates the amount the user intends to donate to the fundraiser.
const handleFundDonationChange = (event) => {
  const donationValue = Math.max(0, Number(event.target.value));
  setNewFundDonation(donationValue);
};

  // Function to close the modal and navigate back to the previous page.
  // It sets the modal"s visibility to false and uses navigate to go back.
  const handleClose = () => {
    setShowModal(false);
    navigate(-1);
  };

  // Effect hook triggers on component mount or when "id" changes, to fetch project and fundraiser data
  useEffect(() => {
    fetchProjectDetailsAndItems();
    fetchFundraiserData();
  }, [id]);

  // Render modal with project details and donation functionalities
  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton style={{ padding: "20px 50px" }}>
        {/* Display the project name or "Loading..." if not yet loaded */}
        <Modal.Title>
          <h2 style={{fontFamily: "'Playfair Display', serif", fontWeight: "600", fontSize: "30px", color: "rgb(62, 62, 62)"}}>
            <FontAwesomeIcon
              icon={faHandHoldingHeart}
              style={{ marginRight: "10px", color: "rgb(61, 61, 61)" }}
            />
            {projectDetails?.name || "Loading..."}
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "30px 100px" }}>
        {/* Display formatted start date of the project */}
        <h5 className="text-muted">
          {projectDetails?.start_date && formatDate(projectDetails.start_date)}
        </h5>
        {/* Display the description of the project */}
        <p style={{fontStyle: 'italic', paddingTop: "5px"}}>{projectDetails?.description}</p>
        <div className="items-needed" style={{padding: "20px 40px 20px 40px"}}>
          <h4>Items Needed</h4>
          {items.map(item => (
            <Item 
              key={item.id} 
              item={item}
              onDonate={handleItemDonate}
              donationAmount={ItemDonationAmount}
              updateDonationAmount={updateItemDonationAmount}
              toggleDonationInput={toggleDonationInput}
              selectedItemId={selectedItemId}
              onDelete={handleDeleteItem}
              isExpanded={item.id === expandedItemId}
              onItemClick={handleItemClick}
              isOrgOwner={isOrgOwner}
            />
          ))}
    
          {/* Conditionally render the NewItemForm if the user is the organization owner */}
          {isOrgOwner && (
            <NewItemForm 
              projectId={id} 
              onNewItem={handleNewItem} 
            />
          )}
        </div>

        <div className="fundraiser" style={{padding: "20px 40px 20px 40px"}}>
          <h4 className="mt-3">Fundraiser</h4>
          {/* Progress bar showing the current state of fundraising */}
          <FundraiserProgressBar 
            projectId={id} 
            fundraiserData={fundraiserData} 
            onFundraiserDonate={handleFundraiserDonate} 
            newFundDonation={newFundDonation}
            handleFundDonationChange={handleFundDonationChange}
            isOrgOwner={isOrgOwner}
          />
    
          {/* Conditionally render the NewFundraiserForm if the user is the organization owner */}
          {isOrgOwner && !fundraiserExists && (
            <NewFundraiserForm
              projectId={id}
              onCreateFundraiser={handleCreateFundraiser}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
  
}

export default ProjectExpanded;
