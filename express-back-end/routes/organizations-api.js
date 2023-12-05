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

// PUT api/organizations/:id
// update an organization in the database and return it as an array of objects
router.put("/:id", (req, res) => {
  const orgId = req.params.id;
  const updatedOrg = req.body;

  organizationQueries
    .updateOrganization(orgId, updatedOrg)
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

// POST api/organizations/projects
// add a new project to the database and return it as an array of objects
router.post("/projects", (req, res) => {
  if (req.session.role === "organization") {
    const orgId = req.session.user.id;

    organizationQueries
      .addProject({ ...req.body})
      .then((project) => {
        res.json({ project });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// GET api/organizations/:id/active-projects
// list of active projects by organization id
router.get("/:id/active-projects", async (req, res) => {
  try {
    const orgId = req.params.id;
    let activeProjects = await projectQueries.getActiveProjectsByOrgId(orgId);

    // Fetch items and organization details for each project
    activeProjects = await Promise.all(activeProjects.map(async (project) => {
      const items = await itemQueries.getItemsByProjectId(project.id);
      const organizationDetails = await organizationQueries.getOrganizationById(project.org_id);
      const organization = organizationDetails[0]
      return { ...project, items, organization };
    }));

    // Send a JSON response with the projects and their items
    res.json(activeProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET api/organizations/:id/past-projects
// list of past projects by organization id
router.get("/:id/past-projects", async (req, res) => {
  try {
    const orgId = req.params.id;
    let pastProjects = await projectQueries.getPastProjectsByOrgId(orgId);

    // Fetch items and organization details for each project
    pastProjects = await Promise.all(pastProjects.map(async (project) => {
      const items = await itemQueries.getItemsByProjectId(project.id);
      const organizationDetails = await organizationQueries.getOrganizationById(project.org_id);
      const organization = organizationDetails[0]
      return { ...project, items, organization };
    }));

    // Send a JSON response with the projects and their items
    res.json(pastProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/follow-org", async (req, res) => {
  try {
    const { user_id, org_id } = req.body;
    const result = await organizationQueries.followOrganization(user_id, org_id);
    res.status(200).json({ success: true, message: "Followed organization successfully.", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/unfollow-org", async (req, res) => {
  try {
    const { user_id, org_id } = req.body;
    const result = await organizationQueries.unfollowOrganization(user_id, org_id);
    res.status(200).json({ success: true, message: "Unfollowed organization successfully.", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET api/organizations/:id/is-followed
router.get("/:id/is-followed", async (req, res) => {
  try {
    const userId = req.query.userId; // Get user ID from query parameters
    const organizationId = req.params.id;

    const isFollowed = await organizationQueries.isUserFollowingOrganization(userId, organizationId);

    res.json({ isFollowed });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
