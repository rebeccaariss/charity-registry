const db = require("../connection");

// check if user exists/check credentials against the database
const checkDonor = async (credentials) => {
  try {
    const { email, password } = credentials;
    const data = await db.query(
      `SELECT id FROM users WHERE email = $1 AND password = $2`,
      [email, password]
    );
    // must resolve or reject as async await (users-api) will pause execution
    // until Promise is either resolved or rejected:
    if (data.rows && data.rows.length > 0) {
      return Promise.resolve({ id: data.rows[0].id });
    } else {
      return Promise.resolve();
    }
  } catch (err) {
    console.log("Error checking user credentials", err);
    return Promise.reject(err);
  }
};

// check if organization exists/check credentials against the database
const checkOrganization = async (credentials) => {
  try {
    const { email, password } = credentials;
    const data = await db.query(
      `SELECT id FROM organizations WHERE email = $1 AND password = $2`,
      [email, password]
    );
    // must resolve or reject as async await (users-api) will pause execution
    // until Promise is either resolved or rejected:
    if (data.rows && data.rows.length > 0) {
      return Promise.resolve({ id: data.rows[0].id });
    } else {
      return Promise.resolve();
    }
  } catch (err) {
    console.log("Error checking organization credentials", err);
    return Promise.reject(err);
  }
};

// add a new user as a donor to the database and return it as an array of objects
const addUser = async (user) => {
  try {
    const { username, email, password, phone } = user;
    const data = await db.query(
      `INSERT INTO users (username, email, password, phone ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, password, phone]
    );
    return Promise.resolve(data.rows);
  } catch (err) {
    console.log("Error adding user", err);
    return Promise.reject(err);
  }
};

module.exports = { checkDonor, checkOrganization, addUser };
