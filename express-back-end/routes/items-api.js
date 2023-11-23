const express = require("express");
const router = express.Router();
const itemQueries = require("../db/queries/items");

// POST api/items
// POST route to add a new item
router.post("/", async (req, res) => {
  const item = req.body;  // Extract the item data from the request body
  try {
    // Attempt to add the item to the database using the addItem query
    const addedItem = await itemQueries.addItem(item);
    // If successful, respond with a 201 status code (CREATED) and the added item
    res.status(201).json(addedItem);
  } catch (err) {
    // If an error occurs respond with error message
    res.status(500).json({ error: err.message });
  }
});


// PUT api/items/1
// PUT route to update an existing item
router.put("/:id", async (req, res) => {
  // Create the item object with the ID from the URL and the data from the request body
  const item = {
    id: req.params.id,
    ...req.body
  };
  try {
    // Attempt to update the item in the database using the updateItem query
    const updatedItem = await itemQueries.updateItem(item);
    // If successful, respond with a 200 status code and the updated item
    res.status(200).json(updatedItem);
  } catch (err) {
    // If an error occurs, respond with a error message
    res.status(500).json({ error: err.message });
  }
});

 //DELETE api/items/1
// DELETE route to delete an item
router.delete("/:id", async (req, res) => {
  // Extract the item ID from the URL
  const itemId = req.params.id;
  try {
    // Attempt to delete the item from the database using the deleteItem query
    const deletedItem = await itemQueries.deleteItem(itemId);
    // If successful, respond with a success message
    res.status(200).json({ message: "Item deleted successfully", item: deletedItem });
  } catch (err) {
    // If an error occurs respond with error message
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;