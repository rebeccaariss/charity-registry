# Features

## Landing Page
- App title
- App tagline
- Preview of what the site offers and/or image/graphic
- "See Active Organizations" button leads to **Organizations (All)**
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

## Organization Profile Creation Page
- Organization can fill in a form with essential info:
  - Name
  - Website
  - Bio
  - Address
  - Contact info
  - Category
  - Email
  - Password
  - Password confirmation

## Organization Profile Page
- Banner, icon, name, website, bio, shipping address/contact info
- Active Projects (series of condensed/preview project components)
- Past Projects (series of condensed/preview project components)

#### Create Project
- Input field for project title
- Input field “call to action” or “appeal”/description here (why should people donate?)
- Input rows for adding items, volunteer hours, fundraiser information
- "Confirm" button on lower right side of modal

#### Project Component: Expanded (Full View)
- Title
- Description
- Shows any/all of requested items, requested volunteer hours, fundraisers
- Data for items fulfilled, hours needed, money raised will appear next to each request
- Items have urgency icons next to them if marked urgent
- When dropdown arrows are clicked, user can see/click "In Progress" and "Donated" buttons

#### Add Items
- Click plus sign under subcategory (items/donations/hours) at bottom of list
- Option to delete next to each request

## User Donation History
- Reverse chronological donation history by user (condensed/preview project components)
