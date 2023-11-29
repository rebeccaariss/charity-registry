const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// POST api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // For testing the endpoint in Postman (cannot have both res.json and
    // res.redirect in the same block of code):
    const isPostmanRequest = req.headers['user-agent'] && req.headers['user-agent'].includes('Postman');

    // await pauses execution until checkDonor and checkOrganization have run
    // (respectively) and their promises either resolve or reject:
    const isDonor = await userQueries.checkDonor({email, password});
    const isOrganization = await userQueries.checkOrganization({email, password});

    // Checks credentials against the users table:
    if (isDonor) {
      // Set role and user id in the session object:
      req.session.role = "donor";
      req.session.user = { id: isDonor.id };

      if (isPostmanRequest) {
        // Send confirmation of login/role:
        res.json({
          success: true,
          role: "donor",
          id: isDonor.id  // Use the id from isDonor directly
        });
      } else {
        res.redirect("/api/projects/followed-projects");
      }

    // Checks credentials against the organizations table:
    } else if (isOrganization) {
      // Set role and user id in the session object:
      req.session.role = "organization";
      req.session.user = { id: isOrganization.id };

      if (isPostmanRequest) {
        // Send confirmation of login/role:
        res.json({
          success: true,
          role: "organization",
          id: isOrganization.id  // Use the id from isOrganization directly
        });
      } else {
        res.redirect(`/profile/${req.session.user.id}`)
      }

    } else {
      // Handle invalid credentials case:
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// POST api/users/logout
router.post("/logout", async (req, res) => {
  req.session = null;
  res.redirect('/landing');
});

module.exports = router;
