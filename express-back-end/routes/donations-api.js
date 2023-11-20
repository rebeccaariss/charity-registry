const express = require("express");
const router = express.Router();
const donationQueries = require("../db/queries/donations");

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

module.exports = router;
