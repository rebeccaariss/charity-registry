const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// POST api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // await pauses execution until checkDonor and checkOrganization have run
    // (respectively) and their promises either resolve or reject:
    const isDonor = await userQueries.checkDonor({ email, password });
    const isOrganization = await userQueries.checkOrganization({
      email,
      password,
    });

    // Checks credentials against the users table:
    if (isDonor) {
      // Set role and user id in the session object:
      req.session.role = "donor";
      req.session.user = { id: isDonor.id };

      // Send confirmation of login/role:
      res.json({
        success: true,
        role: "donor",
        // Convert to string for ease of type comparison on the front-end:
        id: String(isDonor.id)  // Use the id from isDonor directly
      });

      // Checks credentials against the organizations table:
    } else if (isOrganization) {
      // Set role and user id in the session object:
      req.session.role = "organization";
      req.session.user = { id: isOrganization.id };

      // Send confirmation of login/role:
      res.json({
        success: true,
        role: "organization",
        // Convert to string for ease of type comparison on the front-end:
        id: String(isOrganization.id)  // Use the id from isOrganization directly
      });
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
});

// POST api/users
// add a new user as a donor to the database and return it as an array of objects
router.post("/", (req, res) => {
  userQueries
    .addUser(req.body)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
module.exports = router;
