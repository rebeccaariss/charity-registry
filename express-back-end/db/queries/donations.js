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

module.exports = { getDonationHistory };
