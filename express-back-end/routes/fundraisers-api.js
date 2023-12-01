const express = require('express');
const router  = express.Router();
const { getFundraisers, getFundraiserById, getFundraiserByProjectId, createFundraiser, updateFundraiser, deleteFundraiser} = require('../db/queries/fundraisers.js');

// GET /api/fundraisers
// Returns all fundraisers
router.get("/", (req, res) => {
  getFundraisers()
    .then((fundraisers) => {
      res.json(fundraisers);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET /api/fundraisers/:id
// Returns a specific fundraiser
router.get("/:id", (req, res) => {
  getFundraiserById(req.params.id)
    .then((fundraiser) => {
      res.json(fundraiser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// get fundraiser by project id
// GET /api/fundraisers/project/:id
router.get("/project/:id", (req, res) => {
  getFundraiserByProjectId(req.params.id)
    .then((fundraiser) => {
      if (!fundraiser) {
        // No fundraiser found, so send back a default JSON object
        res.json({ amount_raised: 0, goal_amount: 0 });
      } else {
        // Send back the found fundraiser
        res.json(fundraiser);
      }
    })
    .catch((err) => {
      console.error("Error fetching fundraiser:", err);
      res.status(500).json({ error: err.message });
    });
});

// POST /api/fundraisers
// Creates a new fundraiser
router.post("/", (req, res) => {
  const fundraiser = req.body;
  createFundraiser(fundraiser)
    .then((fundraiser) => {
      res.json(fundraiser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// PUT /api/fundraisers/:id
// Updates a specific fundraiser
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { amount_raised } = req.body; 
  console.log(`Received update request for id: ${id} with amount: ${amount_raised}`);

  updateFundraiser(id, amount_raised)
  .then(updatedFundraiser => {
    console.log("Sending updated fundraiser:", updatedFundraiser);
    res.json(updatedFundraiser); 
  })
  .catch(err => {
    console.error("Update error:", err.message);
    res.status(500).json({ error: err.message });
  });
});;


// DELETE /api/fundraisers/:id
// Deletes a specific fundraiser
router.delete("/:id", (req, res) => {
  deleteFundraiser(req.params.id)
    .then((fundraiser) => {
      res.json(fundraiser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});



module.exports = router;


