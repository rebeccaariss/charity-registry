const express = require("express");
const router = express.Router();
const organizationQueries = require("../db/queries/organizations");

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

module.exports = router;
