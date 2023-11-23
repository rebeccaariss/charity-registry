const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// POST api/users/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const isUser = userQueries.checkUser(username, password);
  const isOrganization = userQueries.checkOrganization(username, password);

  if (isUser) {
    // set cookie for logged in user
    res.cookie("user", { username, role: "donor" });

    // redirect to main feed
    // res.redirect("/");

  } else if (isOrganization) {
    // set cookie for logged in organization
    res.cookie("user", { username, role: "organization" });

    // redirect to main feed
    // res.redirect("/");

  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
