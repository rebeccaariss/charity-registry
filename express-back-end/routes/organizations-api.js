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

module.exports = router;
