import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import FundraiserProgressBar from "./FundraiserProgressBar";
import Item from "./Item";

// Utility function for formatting dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export function ProjectExpanded() {
  
  const navigate = useNavigate();
  const { id } = useParams();

  // State for project details and items
  const [projectDetails, setProjectDetails] = useState(null);
  const [items, setItems] = useState([]);

 // State for donation functionality
 // State and setter for tracking which item's donation input is currently active.
  const [selectedItemId, setSelectedItemId] = useState(null);

  // State and setter for managing the donation amounts for each item.
  const [donationAmount, setDonationAmount] = useState({});

  //state for showing modal
  const [showModal, setShowModal] = useState(true);


  // Function to fetch project data
  const fetchProjectDetailsAndItems = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      setProjectDetails(data.project);
      setItems(data.items);
    } catch (error) {
      console.error('Error fetching project details and items:', error);
    }
  };
  // Effect to fetch data on component mount or when id changes needed to show new updated donations items each update
  useEffect(() => {
    fetchProjectDetailsAndItems();
  }, [id]);

  // fetch for sending donation submission
  const handleDonate = async (itemId) => {
    const amount = donationAmount[itemId] || 0;
    console.log(`Donating ${amount} to item ${itemId}`);
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          itemId: itemId,
          quantityDonated: amount,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Donation successful:', result.donation);
        // Re-fetch the data to update the modal with new donation counts
        fetchProjectDetailsAndItems();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Donation failed:', error);
    }
  };

  // Toggles the drop down when clicking a item that allows users to donate
  const toggleDonationInput = (itemId) => {
    if (selectedItemId === itemId) {
        // If the current selectedItemId matches the clicked itemId,
        // set selectedItemId to null to hide the donation input.
        setSelectedItemId(null);
    } else {
        // If a different item is clicked, set selectedItemId to that item's id
        // to show its donation input.
        setSelectedItemId(itemId);
    }
};

// Update donation amount state
  const updateDonationAmount = (itemId, amount) => {
    setDonationAmount({ ...donationAmount, [itemId]: amount });
  };
// Handle modal close and navigate back to last page using navigate
  const handleClose = () => {
    setShowModal(false);
    navigate(-1); // Go back to the previous page
  };

  // Render the modal with project details and donation functionality
  return (
    <Modal show={showModal} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {projectDetails?.name || 'Loading...'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted">
          {projectDetails?.start_date && formatDate(projectDetails.start_date)}
        </p>
        <p>{projectDetails?.description}</p>
        <h5>Items Needed</h5>
        {items.map(item => (
        <Item 
          key={item.id} 
          item={item} 
          onDonate={handleDonate} 
          donationAmount={donationAmount} 
          updateDonationAmount={updateDonationAmount} 
          toggleDonationInput={toggleDonationInput}
          selectedItemId={selectedItemId}
        />
      ))}
        <h5 className="mt-3">Fundraiser</h5>
        <FundraiserProgressBar projectId={id} />
      </Modal.Body>
    </Modal>
  );
}

export default ProjectExpanded;
