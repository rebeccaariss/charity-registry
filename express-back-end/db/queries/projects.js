const db = require("../connection");

const getActiveProjectsByOrgId = (orgId) => {
  return db.query(
    `SELECT
      id,
      name,
      start_date,
      end_date,
      status,
      description,
      project_type,
      published,
      created_at,
      updated_at
    FROM projects
    WHERE org_id = $1 AND status = 'Active' AND published = true
    ORDER BY start_date DESC;`,
    [orgId]
  ).then((data) => {
    return data.rows;
  });
};

const getPastProjectsByOrgId = (orgId) => {
  return db.query(
    `SELECT
      id,
      name,
      start_date,
      end_date,
      status,
      description,
      project_type,
      published,
      created_at,
      updated_at
    FROM projects
    WHERE org_id = $1 AND status != 'Active' AND published = true
    ORDER BY start_date DESC;`,
    [orgId]
  ).then((data) => {
    return data.rows;
  });
};

const getProjectDetails = (project_id) => {
  return db.query(
    `SELECT
      name,
      start_date,
      description
    FROM projects
    WHERE id = $1;`,
    [project_id]
  ).then((data) => {
    return data.rows;
  });
};

module.exports = { getPastProjectsByOrgId, getActiveProjectsByOrgId, getProjectDetails };
