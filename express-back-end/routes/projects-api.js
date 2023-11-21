const express = require("express");
const router = express.Router();
const projectQueries = require("../db/queries/projects");
const itemQueries = require("../db/queries/items");
const organizationQueries = require("../db/queries/organizations");

// Define project routes here

router.get("/followed-projects", async (req, res) => {
  try {
    const userId = 1; // TODO: will have to put cookie logic here
    let followedProjects = await projectQueries.getActiveProjectsForFollowedOrgs(userId);

    // Fetch items and organization details for each followed project
    followedProjects = await Promise.all(followedProjects.map(async (project) => {
      const items = await itemQueries.getItemsByProjectId(project.id);
      const organizationDetails = await organizationQueries.getOrganizationById(project.org_id);
      const organization = organizationDetails[0]
      return { ...project, items, organization };
    }));

    // Send a JSON response with the followed projects, their items, and organization details
    res.json(followedProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;