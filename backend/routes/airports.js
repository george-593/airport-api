const express = require("express");
const router = express.Router();

const validateTypesMiddlware = require("../middleware/validateTypesMiddleware");

const db = require("../utils/db/db");

// GET /api/v1/airports
// ?type=iata&id=ATL
router.get("/", validateTypesMiddlware, async (req, res) => {
  let type = req.query.type;
  let id = req.query.id;

  if (type == undefined || id == undefined) {
    res.status(400).send("Incorrect input");
  }

  type = type.toLocaleLowerCase();

  // Convert int columns to be text
  if (type == "id" || type == "sourceid") {
    id = Number(id);
    if (isNaN(id)) {
      return res.status(400).send("Invalid ID; must be a number.");
    }
  }
  result = await db.query(`SELECT * FROM airports WHERE ${type} = $1`, [id]);

  if (result.rows.length === 0) {
    return res.status(404).send("Airport not found");
  }

  return res.json(result.rows);
});

// GET /api/v1/airports/:iata
router.get("/:iata", async (req, res) => {
  iata = req.params.iata;

  if (iata == undefined) {
    res.status(400).send("Incorrect input");
  }

  result = await db.query(
    "SELECT * FROM airports WHERE LOWER(iata) = LOWER($1)",
    [iata],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ result: "Airport not found" });
  }

  return res.json(result.rows[0]);
});

// POST /api/v1/airports/batch
// Example JSON: {"type": "iata", "ids":["ORD", "LHR"]}
router.post("/batch", validateTypesMiddlware, async (req, res) => {
  let type = req.body.type;
  let ids = req.body.ids;

  if (type == undefined || ids == undefined) {
    res.status(400).send("Incorrect input");
  }

  // Make sure that user provided ints for if the type requires an int
  if (
    (type == "id" || type == "sourceid") &&
    ids.some((item) => typeof item != "number" || isNaN(item))
  ) {
    res.status(400).send("Incorrect input");
  }

  // Create a postgres placeholder for each item in the ID's array so they can be properly passed to pg
  const placeholder = ids.map((_, i) => `$${i + 1}`).join(",");
  console.log(placeholder);
  result = await db.query(
    `SELECT * FROM airports WHERE ${type} in (${placeholder})`,
    ids,
  );

  if (result.rows.length === 0) {
    return res.status(404).send("Airport not found");
  }

  return res.json(result.rows);
});

module.exports = router;
