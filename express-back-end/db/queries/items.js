const db = require("../connection");

const getItemsByProjectId = (projectId) => {
  return db.query(
    `SELECT
      id,
      item_description,
      quantity_needed,
      urgency_level,
      status,
      item_price
    FROM items
    WHERE project_id = $1;`,
    [projectId]
  ).then((data) => {
    return data.rows;
  });
};


module.exports = { getItemsByProjectId };