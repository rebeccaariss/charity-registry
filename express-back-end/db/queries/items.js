const db = require("../connection");

const getItemsByProjectId = (projectId) => {
  return db.query(
    `SELECT
      id,
      item_description,
      quantity_needed,
      urgent,
      status,
      item_price
    FROM items
    WHERE project_id = $1;`,
    [projectId]
  ).then((data) => {
    return data.rows;
  });
};

const addItem = (item) => {
  const {
    project_id,
    item_description,
    quantity_needed,
    urgent,
    status,
    item_price
   } = item;

  return db.query(
    `INSERT INTO items (project_id, item_description, quantity_needed, urgent, status, item_price)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *;`,
    [
      project_id,
      item_description,
      quantity_needed,
      urgent,
      status,
      item_price
    ]
  )
  .then(data => data.rows[0])
  .catch(err => {
    console.log("Error adding item:", err);
  });
}

const updateItem = (item) => {
  const {
    id,
    project_id,
    item_description,
    quantity_needed,
    urgent, status,
    item_price
  } = item;

  return db.query(
    `UPDATE items
     SET project_id = $2, item_description = $3, quantity_needed = $4, urgent = $5, status = $6, item_price = $7
     WHERE id = $1
     RETURNING *;`,
    [
      id,
      project_id,
      item_description,
      quantity_needed,
      urgent,
      status,
      item_price
    ]
  )
  .then(data => data.rows[0])
  .catch(err => {
    console.log("Error updating item:", err);
  });
}

const deleteItem = (id) => {
  return db.query(
    `DELETE FROM items WHERE id = $1 RETURNING *;`,
    [id]
  )
  .then(data => data.rows[0])
  .catch(err => {
    console.log("Error deleting item:", err);
  });
}


module.exports = { getItemsByProjectId, addItem, updateItem, deleteItem };
