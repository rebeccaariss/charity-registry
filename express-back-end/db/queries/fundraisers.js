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

module.exports = { getFundraisers, getFundraiserById, getFundraiserByProjectId };
