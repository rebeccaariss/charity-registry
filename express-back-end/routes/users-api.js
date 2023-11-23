const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

// POST api/users/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const isUser = userQueries.checkUser(email, password);
  const isOrganization = userQueries.checkOrganization(email, password);

  if (isUser) {
    // set cookie for logged in user
    res.cookie("user", { email, role: "donor" });

    // redirect to main feed
    // res.redirect("/");

  } else if (isOrganization) {
    // set cookie for logged in organization
    res.cookie("user", { email, role: "organization" });

    // redirect to main feed
    // res.redirect("/");

  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
