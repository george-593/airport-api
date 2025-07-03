// Imports
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "../.env" });

// Route imports
const airportsRoute = require("./routes/airports");

// Environment vars
const PORT = process.env.API_PORT || 5000;
const API_ROOT = process.env.API_ROOT || "api/v1/";

// Express setup
const app = express();
app.use(bodyParser.json());

// Routes
const router = express.Router();

// Base route
router.get("/", (req, res) => {
  res.send("<h1>Airport API</h1>");
});

// Tell Express to use routes and API Root
app.use(API_ROOT, router);

// Imported Routes
router.use("/airports", airportsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
