const db = require("../connection");

  // check if user exists/check credentials against the database
  const checkDonor = async (credentials) => {
    try {
      const { email, password } = credentials;
      const data = await db
        .query(
          `SELECT * FROM users WHERE email = $1 AND password = $2`,
          [email, password]
        );
        // must resolve or reject as async await (users-api) will pause execution
        // until Promise is either resolved or rejected:
        return Promise.resolve(data.rows[0]);
    } catch (err) {
      console.log("Error checking user credentials", err);
      return Promise.reject(err);
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
        // must resolve or reject as async await (users-api) will pause execution
        // until Promise is either resolved or rejected:
        return Promise.resolve(data.rows[0]);
    } catch (err) {
      console.log("Error checking organization credentials", err);
      return Promise.reject(err);
    }
  }

module.exports = { checkDonor, checkOrganization };
