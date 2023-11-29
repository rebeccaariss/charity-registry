import React from "react";
import { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const FundraiserProgressBar = ({ projectId }) => {
  const [fundraiserData, setFundraiserData] = useState({
    amount_raised: 0,
    goal_amount: 0,
  });

  useEffect(() => {
    fetch(`/api/fundraisers/5`)
      .then((response) => response.json())
      .then((data) => {
        setFundraiserData({
          amount_raised: data.amount_raised || 0,
          goal_amount: data.goal_amount || 0,
        });
      })
      .catch((error) => {
        console.error("Error fetchingfundraiser data:", error);
      });
  }, [projectId]);

  const calculateProgress = () => {
    const { amount_raised, goal_amount } = fundraiserData;
    return (amount_raised / goal_amount) * 100;
  };

  return (
    <div
      className="FundraiserProgress"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Fundraiser Progress</h2>
      <p>Amount Raised: {fundraiserData.amount_raised}</p>
      <p>Goal Amount: {fundraiserData.goal_amount}</p>
      <ProgressBar style={{ width: "75%" }}>
        <ProgressBar
          variant="primary"
          now={calculateProgress()}
          key={1}
          label={`${calculateProgress()}%`}
        />
        <ProgressBar
          variant="secondary"
          now={100 - calculateProgress()}
          key={2}
        />
      </ProgressBar>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
          width: "75%",
        }}
      >
        <span>$0</span>
        <span>${fundraiserData.goal_amount}</span>
      </div>
    </div>
  );
};

export default FundraiserProgressBar;
