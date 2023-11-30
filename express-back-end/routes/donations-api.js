const express = require("express");
const router = express.Router();
const donationQueries = require("../db/queries/donations");

// GET api/donations/user/:id
// get all donations for a specific user by user id
router.get("/user/:id", (req, res) => {
  donationQueries
    .getDonationHistory(req.params.id)
    .then((donations) => {
      res.json({ donations });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const { userId, itemId, quantityDonated } = req.body;
  
  donationQueries.postDonation(userId, itemId, quantityDonated)
    .then(donation => {
      res.status(201).json({ donation });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
