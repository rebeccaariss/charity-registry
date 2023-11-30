const db = require("../connection");

const getDonationHistory = (user_id) => {
  return db
    .query(
      `SELECT
        items.item_description,
        projects.name AS project_name,
        organizations.name AS organization_name,
        donations.donation_date,
        donations.quantity_donated,
        items.quantity_needed
      FROM items
      JOIN projects ON items.project_id = projects.id
      JOIN organizations ON projects.org_id = organizations.id
      JOIN donations ON items.id = donations.item_id
      WHERE donations.user_id = $1
      ORDER BY donations.donation_date DESC;`,
      [user_id]
    )
    .then((data) => {
      return data.rows;
    });
};

const postDonation = (userId, itemId, quantityDonated) => {
  const query = `
    INSERT INTO donations (user_id, item_id, quantity_donated, donation_date)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;`;

  const values = [userId, itemId, quantityDonated];

  return db.query(query, values)
    .then((result) => result.rows[0])
    .catch((err) => {
      throw err;
    });
};

module.exports = { getDonationHistory, postDonation };
