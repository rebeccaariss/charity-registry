const express = require("express");
const router = express.Router();
const projectQueries = require("../db/queries/projects");

// GET api/projects/:id
// get all project info for a specific project by id
router.get("/:id", (req, res) => {
  projectQueries
    .getProjectDetails(req.params.id)
    .then((project) => {
      res.json({ project });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
