# Features

## Landing Page
- App title
- App tagline
- Preview of what the site offers and/or image/graphic
- "See Active Organizations" button leads to **Organizations (All)**
- Logo in nav bar (upper left) leads to **Organizations (All)**
- Register button
- Sign in button

## Main Feed
- Shown after login
- Shows **projects** in reverse chronological order with a snapshot of request data (condensed/preview version of project component)
  - Does not show *all* request data/fulfillment options
  - Clicking a project goes to organization profile
- *Stretch:* Filtering options menu
- If user is not yet following any organizations, display message like: “Follow some **Organizations** to see their updates here”

## Organizations (All)
- Whether a user is logged in or not, should see all organizations in the database on this page (regardless of location or any filtering options - shows everything on the app)
- Organizations page shows all organizations (cards view)
- Clicking a card goes to **organization profile**
- *Stretch:* Filtering options menu

## Organizations (Following)
- Visually the same as **Organizations (All)**, but shows only the organizations that a user follows
- Followed organizations displayed in cards view
- Clicking a card leads to **organization profile**
- *Stretch:* Filtering options menu
- If user is not yet following any organizations, display message like: “Follow some **Organizations** to see their updates here”

## Create an Organization (Visible to Organizations Only)
- Organization can fill in a form with essential info:
  - Name
  - Website
  - Bio
  - Address
  - Contact info
  - Category (from dropdown menu)
  - Email
  - Password
  - Password confirmation

## Organization Profile Page
- Banner, category icon/image, name, website, bio, shipping address/contact info
- Active Projects (series of condensed/preview project components)
- Past Projects (series of condensed/preview project components)

  #### Create Project: Condensed (Visible to Organizations Only)
  - Appears beneath banner/organization info & above projects
  - Input field for project title
  - Input field for “call to action”/description
  - "Add" (plus sign) button on lower right side of modal opens expanded modal

  #### Create/Edit Project: Expanded Modal (Visible to Organizations Only)
  - After entering title and description on condensed form & clicking plus sign, "Create Project" form expands into this modal
  - Text entered for title and "call to action"/description still appears
  - Input fields under three categories: Items, Volunteer Hours, and Fundraisers
  - "Confirm" button on lower right side of modal
  - This component also serves as the "edit"/"update" modal (items can be added/removed, information can be updated)

  #### View Project: Expanded Modal (Clickable by Users & Organizations)
  - Title
  - Description
  - Edit and Delete buttons visible to organizations only
  - Shows any/all of requested items, requested volunteer hours, fundraisers
  - Data for items fulfilled, hours needed, money raised/needed will appear next to each request
  - Items have urgency icons next to them if marked urgent
  - Clicking an item or its dropdown arrow changes the orientation of the arrow; expanded item shows more information about the item as well as "In Progress" and "Donated" buttons

  #### Add Items (Visible to Organizations Only)
  - Click plus sign under subcategory (items/donations/hours) at bottom of list
  - Option to delete next to each request

## User Donation History
- Reverse chronological feed/history of user donations
