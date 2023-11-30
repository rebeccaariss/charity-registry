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
      res.json(fundraiser);
    })
    .catch((err) => {
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
  // extract the id from the url
  const { id } = req.params;
  // extract the rest of the data from the body
  const fundraiser = req.body;
  updateFundraiser(id, fundraiser)
    .then((updateFundraiser) => {
      res.json(updateFundraiser);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

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


