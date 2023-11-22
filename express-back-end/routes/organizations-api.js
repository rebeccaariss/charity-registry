const express = require("express");
const router = express.Router();
const organizationQueries = require("../db/queries/organizations");
const projectQueries = require("../db/queries/projects");
const itemQueries = require("../db/queries/items");

// GET api/organizations
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

// GET api/organizations/:id
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

// POST api/organizations
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

// GET api/organizations/:id/profile
router.get("/:id/profile", async (req, res) => {
  //try 'trys' to run the code if anything fails it skips to the catch at the bottom for error display
  try {
    // Extract the organization ID from the request parameters.
    const orgId = req.params.id;

    // Retrieve the organization's details from the database based on the organization ID.
    const organizationDetails = await organizationQueries.getOrganizationById(orgId);
    
    // Check if the organization was found. If not, send a 404 Not Found response.
    if (!organizationDetails) {
      return res.status(404).json({ error: "Organization not found" });
    }
    const organization = organizationDetails[0];
    // Retrieve all active projects for the organization from the database.
    let activeProjects = await projectQueries.getActiveProjectsByOrgId(orgId);

    // Retrieve all past projects for the organization from the database.
    let pastProjects = await projectQueries.getPastProjectsByOrgId(orgId);

    // Fetch items for each active project.
    // Use Promise.all to wait for all items of all active projects to be fetched concurrently.
    activeProjects = await Promise.all(activeProjects.map(async (project) => {
      // Retrieve items for the current project.
      const items = await itemQueries.getItemsByProjectId(project.id);
      // Return the project data along with the associated items.
      return { ...project, items };
    }));

    // Fetch items for each past project using the same method as for active projects.
    pastProjects = await Promise.all(pastProjects.map(async (project) => {
      const items = await itemQueries.getItemsByProjectId(project.id);
      return { ...project, items };
    }));

    // Send a JSON response containing the organization details, active projects, and past projects.
    res.json({ organization, activeProjects, pastProjects });
  } catch (err) {
    // If an error occurs in the try block, catch it and send a 500 Internal Server Error response.
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
