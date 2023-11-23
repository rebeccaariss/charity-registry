const db = require("../connection");

  // check if user exists/check credentials against the database
  const checkUser = async (credentials) => {
    try {
      const { username, password } = credentials;
      const data = await db
        .query(
          `SELECT * FROM users WHERE username = $1 AND password = $2`,
          [username, password]
        );
        return data.rows[0];
    } catch (err) {
      console.log("Error checking user credentials", err);
    }
  }

  // check if organization exists/check credentials against the database
  const checkOrganization = async (credentials) => {
    try {
      const { username, password } = credentials;
      const data = await db
        .query(
          `SELECT * FROM organizations WHERE username = $1 AND password = $2`,
          [username, password]
        );
        return data.rows[0];
    } catch (err) {
      console.log("Error checking organization credentials", err);
    }
  }

module.exports = { checkUser, checkOrganization };
