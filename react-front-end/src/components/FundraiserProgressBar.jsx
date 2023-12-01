import ProgressBar from "react-bootstrap/ProgressBar";

const FundraiserProgressBar = ({ projectId, fundraiserData, onFundraiserDonate, newFundDonation, handleFundDonationChange }) => {
  
  const calculateProgress = () => {
    const { amount_raised, goal_amount } = fundraiserData;
    return (amount_raised / goal_amount) * 100;
  };

  // Check if goal_amount is greater than 0 to ensure fundraiser data is loaded
  if (fundraiserData.goal_amount > 0) {
    return (
      <div
        className="FundraiserProgress"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <p>Amount Raised: ${fundraiserData.amount_raised.toFixed(2)}</p>
        <input type="number" value={newFundDonation} onChange={handleFundDonationChange} placeholder="Enter donation amount" />
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
      </div>
    );
  } else {
    // Render nothing or a placeholder if fundraiser data is not yet available
    return null;
  }
};

export default FundraiserProgressBar;
