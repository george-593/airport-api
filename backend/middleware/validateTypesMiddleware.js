// Middleware to check that the user supplied types are only allowed to be column names in the DB
function validateTypesMiddlware(req, res, next) {
  const type = req.query?.type || req.body?.type;

  const allowedTypes = [
    "id",
    "source_id",
    "airport_name",
    "city",
    "country",
    "iata",
    "icao",
    "latitude",
    "longitude",
    "altitude",
    "timezone",
    "dst",
    "tzdb_timezone",
    "airport_type",
    "source",
  ];
  if (!allowedTypes.includes(type)) {
    return res.status(400).send("Invalid column type");
  }

  next();
}

module.exports = validateTypesMiddlware;
