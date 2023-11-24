const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// POST api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // await pauses execution until checkDonor and checkOrganization have run
    // (respectively) and their promises either resolve or reject:
    const isDonor = await userQueries.checkDonor({email, password});
    const isOrganization = await userQueries.checkOrganization({email, password});

    if (isDonor !== undefined) {
      // set role directly using session object provided by cookie-session:
      req.session.role = "donor";
      // set the user to include the return data from isDonor:
      req.session.user = isDonor;
      // send confirmation of login/role to Postman for now:
      res.json({
        success: true,
        role: "donor",
        id: req.session.user.id
      });

      // redirect to main feed
      // res.redirect("");

    } else if (isOrganization !== undefined) {
      // set role directly using session object provided by cookie-session:
      req.session.role = "organization";
      // set the user to include the return data from isOrganization:
      req.session.user = isOrganization;
      // send confirmation of login/role to Postman for now:
      res.json({
        success: true,
        role: "organization",
        id: req.session.user.id
      });

      // redirect to main feed
      // res.redirect("");

    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
