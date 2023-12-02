import ProgressBar from "react-bootstrap/ProgressBar";

const FundraiserProgressBar = ({ projectId, fundraiserData, onFundraiserDonate, newFundDonation, handleFundDonationChange }) => {
  
  const calculateProgress = () => {
    const { amount_raised, goal_amount } = fundraiserData;
    const progress = (amount_raised / goal_amount) * 100;
    return Math.min(progress, 100); // Ensure progress does not exceed 100%
  };

  const isGoalReached = fundraiserData.amount_raised >= fundraiserData.goal_amount;

  return (
    <div className="FundraiserProgress" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p>Amount Raised: ${fundraiserData.amount_raised.toFixed(2)}</p>
      {!isGoalReached && (
        <>
          <input 
            type="number" 
            value={newFundDonation} 
            onChange={handleFundDonationChange} 
            placeholder="Enter donation amount" 
            max={fundraiserData.goal_amount - fundraiserData.amount_raised}
          />
          <button onClick={onFundraiserDonate}>Donate</button>
        </>
      )}
      {isGoalReached && <p>Fundraiser Goal of ${fundraiserData.goal_amount} Reached! Thank you!</p>}
      <ProgressBar style={{ width: "75%" }}>
        <ProgressBar
          variant="primary"
          now={calculateProgress()}
          key={1}
          label={`${calculateProgress().toFixed(2)}%`}
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


