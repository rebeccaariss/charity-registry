import ProgressBar from "react-bootstrap/ProgressBar";
import { Row, Col, Form, Button } from "react-bootstrap";

const FundraiserProgressBar = ({ projectId, fundraiserData, onFundraiserDonate, newFundDonation, handleFundDonationChange, isOrgOwner }) => {
  
  const calculateProgress = () => {
    const { amount_raised, goal_amount } = fundraiserData;
    const progress = (amount_raised / goal_amount) * 100;
    return Math.min(progress, 100); // Ensure progress does not exceed 100%
  };

  const isGoalReached = fundraiserData.amount_raised >= fundraiserData.goal_amount;

  if (!fundraiserData.amount_raised && !fundraiserData.goal_amount) {
    return (
      <div className="FundraiserProgress">
        <p>Fundraiser not set up yet.</p>
      </div>
    );
  }


  return (
    <div>
      <p style={{fontStyle: 'italic'}}>Amount Raised: ${fundraiserData.amount_raised.toFixed(2)}</p>
      <div className="FundraiserProgress d-flex flex-column align-items-center" style={{marginTop: "40px"}}>
      {isGoalReached && <p>Fundraiser Goal of ${fundraiserData.goal_amount} Reached! Thank you!</p>}
          <ProgressBar style={{ width: "75%" }}>
            <ProgressBar
              style={{backgroundColor: "rgb(120, 156, 115)"}}
              now={calculateProgress()}
              key={1}
              label={`${calculateProgress().toFixed(0)}%`}
            />
          </ProgressBar>
        <div
          style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", width: "75%", }}>
          <span>$0</span>
          <span>${fundraiserData.goal_amount}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 0px 10px 0px" }}>
          {!isGoalReached && !isOrgOwner && (
            <Row>
              <Col md={8}>
                <Form.Control 
                  type="number" 
                  value={newFundDonation} 
                  onChange={handleFundDonationChange} 
                  placeholder="$" 
                  max={fundraiserData.goal_amount - fundraiserData.amount_raised}
                />
              </Col>
              <Col md={4}>
                <Button style={{ backgroundColor: "rgb(120, 156, 115)", color: "white", border: "rgb(120, 156, 115)" }} size="m" type="submit" onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgb(100, 136, 95)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgb(120, 156, 115)" )} onClick={onFundraiserDonate}>Donate</Button>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundraiserProgressBar;


