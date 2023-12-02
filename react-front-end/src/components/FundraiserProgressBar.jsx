import ProgressBar from "react-bootstrap/ProgressBar";

const FundraiserProgressBar = ({ projectId, fundraiserData, onFundraiserDonate, newFundDonation, handleFundDonationChange }) => {
  
  const calculateProgress = () => {
    const { amount_raised, goal_amount } = fundraiserData;
    return (amount_raised / goal_amount) * 100;
  };

  const isGoalReached = fundraiserData.amount_raised >= fundraiserData.goal_amount;

  return (
    <div className="FundraiserProgress" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {isGoalReached ? (
        <p>Fundraiser Goal of ${fundraiserData.goal_amount} Reached!</p>
      ) : (
        <>
          <p>Amount Raised: ${fundraiserData.amount_raised.toFixed(2)}</p>
          <input 
            type="number" 
            value={newFundDonation} 
            onChange={handleFundDonationChange} 
            placeholder="Enter donation amount" 
            max={fundraiserData.goal_amount - fundraiserData.amount_raised}
          />
          <button onClick={onFundraiserDonate}>Donate</button>
          <ProgressBar style={{ width: "75%" }}>
            <ProgressBar
              variant="primary"
              now={calculateProgress()}
              key={1}
              label={`${calculateProgress().toFixed(2)}%`}
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
        </>
      )}
    </div>
  );
};

export default FundraiserProgressBar;

