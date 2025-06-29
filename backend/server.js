// Imports
const express = require("express");
require("dotenv").config({ path: "../.env" });

// Route imports

// Environment vars
const PORT = process.env.API_PORT || 5000;
const API_ROOT = process.env.API_ROOT;

// Express setup
const app = express();

// Routes
const router = express.Router();

// Base route
router.get("/", (req, res) => {
  res.send("<h1>Airport API</h1>");
});

// Imported Routes

// Tell Express to use routes and API Root
app.use(API_ROOT, router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
