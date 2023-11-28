import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DonationListItem from "./DonationListItem";
import NavBar from "./NavBar";

const DonationList = () => {
  // use the id from the URL to fetch the list of projects
  const { id } = useParams();
  // set up state for the list of donations
  const [donations, setDonations] = useState([]);

  // helper function to format the date
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options); // Oct 20, 2023
    return formattedDate;
  }

  // fetch the list of donations from the server
  useEffect(() => {
    fetch(`/api/donations/user/${id}`)
      .then((response) => {
        // check if the response is ok
        if (!response.ok) {
          throw new Error(`error! ${response.status}`);
        }
        return response.json();
      })
      // set the list of donations in state
      .then((data) => {
        setDonations(data.donations);
      })
      // catch any errors and log them to the console
      .catch((error) => {
        console.error("Error:", error);
      });
    // empty dependency array to run only once
  }, []);

  // if there are no donations, display a message
  if (donations.length === 0) {
    return (
      <div>
        <p>You haven't made any donations yet.</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div
        className="donation-list-container shadow p-3 mb-5 bg-white rounded"
        style={{ padding: "0 20px" }}
      >
        <ul className="list-unstyled">
          {donations.map((donation) => (
            <DonationListItem
              key={donation.id}
              // pass in the donation object as props
              donation={{
                // spread the donation object
                ...donation,
                // add a formatted date property
                donation_date: formatDate(donation.donation_date),
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default DonationList;
