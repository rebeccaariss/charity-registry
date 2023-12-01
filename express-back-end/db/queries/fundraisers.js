const db = require("../connection");

// retruns all fundraisers

const getFundraisers = () => {
  return db.query(`SELECT * FROM fundraisers;`).then((data) => {
    return data.rows;
  } );
}

// returns a specific fundraiser

const getFundraiserById = (id) => {
  return db.query(`SELECT * FROM fundraisers WHERE id = $1;`, [id]).then((data) => {
    return data.rows[0];
  });
}

// returns a fundraiser by project id
const getFundraiserByProjectId = (id) => {
  return db.query(`SELECT * FROM fundraisers WHERE project_id = $1;`, [id]).then((data) => {
    return data.rows[0];
  });
}

// creates a new fundraiser
const createFundraiser = (fundraiser) => {
  const { project_id, amount_raised, goal_amount } = fundraiser;
  return db.query(
    `
    INSERT INTO fundraisers (project_id, amount_raised, goal_amount)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [project_id, amount_raised, goal_amount]
  ).then((data) => {
    return data.rows[0];
  }).catch((err) => {
    console.log("Error registering fundraiser:", err);
    throw err;
  });
}

// updates a specific fundraiser
const updateFundraiser = (id, amount_raised) => {
  console.log(`Updating fundraiser with id: ${id}, new amount raised: ${amount_raised}`);
  return db.query(
    `UPDATE fundraisers SET amount_raised = $1 WHERE id = $2 RETURNING *;`,
    [amount_raised, id]
  ).then(data => {
    console.log("Updated fundraiser:", data.rows[0]);
    return data.rows[0];
  });
};


// deletes a specific fundraiser
const deleteFundraiser = (id) => {
  return db.query(
    `
    DELETE FROM fundraisers
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  ).then((data) => {
    return data.rows[0];
  });
}


module.exports = { getFundraisers, getFundraiserById, getFundraiserByProjectId, createFundraiser, updateFundraiser, deleteFundraiser };
