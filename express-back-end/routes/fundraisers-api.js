const express = require('express');
const router  = express.Router();
const { getFundraisers, getFundraiserById, getFundraiserByProjectId } = require('../db/queries/fundraisers.js');

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

module.exports = router;


