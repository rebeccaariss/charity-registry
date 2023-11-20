const express = require("express");
const router = express.Router();
const organizationQueries = require("../db/queries/organizations");

// get all organizations and their info from the database and return it as an array of objects
router.get("/", (req, res) => {
  organizationQueries
    .getOrganizations()
    .then((organizations) => {
      res.json({ organizations });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// get a specific organization and their info from the database and return it as an array of objects
router.get("/:id", (req, res) => {
  organizationQueries
    .getOrganizationById(req.params.id)
    .then((organization) => {
      res.json({ organization });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// add a new organization to the database and return it as an array of objects

router.post("/", (req, res) => {
  organizationQueries
    .addOrganization(req.body)
    .then((organization) => {
      res.json({ organization });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
