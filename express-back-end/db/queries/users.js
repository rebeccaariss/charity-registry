const db = require("../connection");

  // check if user exists/check credentials against the database
  const checkUser = async (credentials) => {
    try {
      const { email, password } = credentials;
      const data = await db
        .query(
          `SELECT * FROM users WHERE email = $1 AND password = $2`,
          [email, password]
        );
        return data.rows[0];
    } catch (err) {
      console.log("Error checking user credentials", err);
    }
  }

  // check if organization exists/check credentials against the database
  const checkOrganization = async (credentials) => {
    try {
      const { email, password } = credentials;
      const data = await db
        .query(
          `SELECT * FROM organizations WHERE email = $1 AND password = $2`,
          [email, password]
        );
        return data.rows[0];
    } catch (err) {
      console.log("Error checking organization credentials", err);
    }
  }

module.exports = { checkUser, checkOrganization };
