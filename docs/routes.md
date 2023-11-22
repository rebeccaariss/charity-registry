## ✨ ROUTES ✨
  
## Organizations:
GET api/organizations - Retrieve a list of all organizations.
GET api/organizations/:id  - Retrieve details of a specific organization. 
PUT api/organizations/:id - Edit a specific organization.
GET /organizations/signup - Render a register page for organizations.
POST api/organizations - Create a new organization.
 
## Items
GET  api/items/project_id - Retrieve a list of all item requests.
GET api/items/:id - Retrieve details of a specific item request.
PUT api/items/project_id  - Edit a specific item_request
POST api/items - Create a new item request.

## Donations:
GET api/donations/item_id - Retrieve a list of all donations.
GET api/donations/project_id - Retrieve a list of all donations.
GET api/donations/user/:id - Retrieve donation history for a specific user.
GET api/donations/:id - Retrieve details of a specific donation.
POST api/donations - Make a new donation.

## Projects

GET api/organizations/projects - Retrieve a list of all projects
GET api/projects/:id - Retrieve details of a specific project
PUT api/organizations/projects/:id - Edit a specific project
POST api/organizations/projects - Make a new project

## Users:

GET users/login - This route renders the login form page
POST users/login - submit the form data

## Organizations:

GET organizations/register - This route renders the register form page
POST organizations/register - submit the form data
