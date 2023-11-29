// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON payloads
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
)

// API routes
const usersApiRoutes = require('./routes/users-api');
const organizationApiRoutes = require('./routes/organizations-api');
const projectsApiRoutes = require('./routes/projects-api');
const itemsApiRoutes = require('./routes/items-api');
const donationsApiRoutes = require('./routes/donations-api');
const fundraiserApiRoutes = require('./routes/fundraisers-api');
// ... import other API routes here ...

// Mount API routes
app.use('/api/users', usersApiRoutes);
app.use('/api/organizations', organizationApiRoutes);
app.use('/api/projects', projectsApiRoutes);
app.use('/api/items', itemsApiRoutes);
app.use('/api/donations', donationsApiRoutes);
app.use('/api/fundraisers', fundraiserApiRoutes);
// ... mount other API routes here ...

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
