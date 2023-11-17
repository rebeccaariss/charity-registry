// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON payloads

// API routes
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
// ... import other API routes here ...

// Mount API routes
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
// ... mount other API routes here ...

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
