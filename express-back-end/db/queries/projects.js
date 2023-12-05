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
    ORDER BY created_at DESC;`,
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
      projects.name,
      projects.org_id,
      projects.start_date,
      projects.description
    FROM projects
    WHERE projects.id = $1;`,
    [project_id]
  ).then((data) => {
    return data.rows[0];
  });
};

const getActiveProjectsForFollowedOrgs = (userId) => {
  return db.query(
    `SELECT
      p.id,
      p.name,
      p.org_id,
      p.start_date,
      p.end_date,
      p.status,
      p.description,
      p.project_type,
      p.published,
      p.created_at,
      p.updated_at
    FROM projects p
    INNER JOIN organization_followers of ON p.org_id = of.org_id
    WHERE of.user_id = $1 AND p.status = 'Active' AND p.published = true
    ORDER BY p.start_date DESC;`,
    [userId]
  ).then((data) => {
    return data.rows;
  });
};

module.exports = { getPastProjectsByOrgId, getActiveProjectsByOrgId, getProjectDetails, getActiveProjectsForFollowedOrgs };
