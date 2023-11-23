const db = require("../connection");

  // check if user exists/check credentials against the database
  const checkUser = async (credentials) => {
    try {
      const data = await db
        .query(
          ``,
          []
        );
    } catch (err) {
      console.log("", err);
    }
  }

  // check if organization exists/check credentials against the database
  const checkOrganization = async (credentials) => {
    try {
      const data = await db
        .query(
          ``,
          []
        );
    } catch (err) {
      console.log("", err);
    }
  }

module.exports = { checkUser, checkOrganization };
