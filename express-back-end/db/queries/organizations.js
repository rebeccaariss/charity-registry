const db = require("../connection");

  // get all organizations and their info from the database and return it as an array of objects
  const getOrganizations = () => {
    return db
      .query(
        `SELECT
        o.id,
        o.name,
        o.website,
        o.category,
        o.email,
        o.phone,
        COUNT(CASE WHEN i.urgent THEN 1 END) AS "urgent_requests",
        COUNT(CASE WHEN i.status = 'Active' THEN 1 END) AS "active_requests",
        CONCAT(
          o.street_number, ' ', o.street_name,
          CASE WHEN o.unit IS NOT NULL THEN CONCAT(', ', o.unit) ELSE '' END,
          ', ', o.city, ', ', o.province, ', ', o.country, ', ', o.postal_code
      ) AS "address",
        o.description
    FROM organizations o
    LEFT JOIN projects p ON o.id = p.org_id
    LEFT JOIN items i ON p.id = i.project_id
    GROUP BY
        o.id,
        o.name,
        o.website,
        o.category,
        o.email,
        o.phone,
        o.street_number,
        o.street_name,
        o.unit,
        o.city,
        o.province,
        o.country,
        o.postal_code,
        o.description
        ORDER BY o.id DESC;
    ;`
      )
      .then((data) => {
        return data.rows;
      });
  };

  // get a specific organization and their info from the database and return it as an array of objects
  const getOrganizationById = (id) => {
    return db
      .query(
        `SELECT
        o.name,
        o.website,
        o.category,
        o.description,
        o.street_number,
        o.street_name,
        o.unit,
        o.city,
        o.province,
        o.country,
        o.postal_code,
        o.email,
        o.phone,
        COUNT(CASE WHEN i.urgent THEN 1 END) AS "urgent_requests",
        COUNT(CASE WHEN i.status = 'Active' THEN 1 END) AS "active_requests"
    FROM organizations o
    LEFT JOIN projects p ON o.id = p.org_id
    LEFT JOIN items i ON p.id = i.project_id
    WHERE o.id = $1
    GROUP BY
        o.name,
        o.website,
        o.category,
        o.description,
        o.street_number,
        o.street_name,
        o.unit,
        o.city,
        o.province,
        o.country,
        o.postal_code,
        o.email,
        o.phone;`,
        [id]
      )
      .then((data) => {
        return data.rows;
      });
  }

  // add a new organization to the database and return it as an array of objects
  const addOrganization = (organization) => {
    const {
      name,
      description,
      street_number,
      street_name,
      unit,
      city,
      province,
      country,
      postal_code,
      email,
      password,
      phone,
      category,
      website,
    } = organization;

    return db
    .query(
      `INSERT INTO organizations (
        name,
        description,
        street_number,
        street_name,
        unit,
        city,
        province,
        country,
        postal_code,
        email,
        password,
        phone,
        category,
        website
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 , $12, $13, $14)
      RETURNING *;`,
      [
        name,
        description,
        street_number,
        street_name,
        unit,
        city,
        province,
        country,
        postal_code,
        email,
        password,
        phone,
        category,
        website,
      ]
    )
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log("Error registering organization:", err);
    });
  }

  // update an organization in the database and return it as an array of objects
  const updateOrganization = (id,organization) => {
    const {
      name,
      description,
      street_number,
      street_name,
      unit,
      city,
      province,
      country,
      postal_code,
      email,
      phone,
      category,
      website,
    } = organization;

    return db
    .query(
      `UPDATE organizations
      SET name = $1, description = $2, street_number = $3, street_name = $4, unit = $5, city = $6, province = $7, country = $8, postal_code = $9, email = $10, phone = $11, category = $12, website = $13
      WHERE id = $14
      RETURNING *;`,
      [
        name,
        description,
        street_number,
        street_name,
        unit,
        city,
        province,
        country,
        postal_code,
        email,
        phone,
        category,
        website,
        id,
      ]
    )
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log("Error updating organization:", err);
    });
  }

  // add a new project to the database and return it as an array of objects
  const addProject = (project) => {
    const {
      org_id,
      name,
      description,
    } = project;

    return db
    .query(
      `INSERT INTO projects (
        org_id,
        name,
        description,
        status,
        published
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;`,
      [
        org_id,
        name,
        description,
        "Active",
        true
      ]
    )
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log("Error registering organization:", err);
      throw err;
    });
  }

  const followOrganization = (userId, organizationId) => {
    return db.query(`
      INSERT INTO organization_followers (user_id, org_id)
      VALUES ($1, $2)
      RETURNING *;
    `, [userId, organizationId])
  };
  
  const unfollowOrganization = (userId, organizationId) => {
    return db.query(`
      DELETE FROM organization_followers
      WHERE user_id = $1 AND org_id = $2
      RETURNING *;
    `, [userId, organizationId])
  };
  const isUserFollowingOrganization = (userId, organizationId) => {
    return db.query(`
      SELECT EXISTS (
        SELECT 1
        FROM organization_followers
        WHERE user_id = $1 AND org_id = $2
      );
    `, [userId, organizationId])
    .then(data => data.rows[0].exists);
  };

  module.exports = { getOrganizations, getOrganizationById, addOrganization, updateOrganization, addProject, followOrganization, unfollowOrganization, isUserFollowingOrganization };
