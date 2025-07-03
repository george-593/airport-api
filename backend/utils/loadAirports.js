require("dotenv").config({ path: "../.env" });

const fs = require("fs/promises");
const db = require("./db/db");
const { exit } = require("process");

const DATA_PATH = process.env.DATA_PATH;
// The size of requests to insert into the DB
BATCH_SIZE = 1000;

async function loadAirportsFromFile() {
  let airports = [];
  const data = await fs.readFile(DATA_PATH, "utf8");

  // Create an array for each line (airport) of the file
  const lines = data.split("\n");

  for (let line of lines) {
    // Remove excess quotes from data
    line = line.replaceAll('\"', "");

    // Skip if there is no data
    if (line === "") {
      continue;
    }

    // Split by comma which is the seperator beteween each value
    elems = line.split(",");

    // Map the data to a object
    const airport = {
      id: elems[0],
      name: elems[1],
      city: elems[2],
      country: elems[3],
      iata: elems[4],
      icao: elems[5],
      latitude: elems[6],
      longitude: elems[7],
      altitude: elems[8],
      timezone: elems[9],
      dst: elems[10],
      tzTimezone: elems[11],
      type: elems[12],
      source: elems[13],
    };
    // Add to the main airports array
    airports.push(airport);
    //console.log(airports);
  }
  return airports;
}

// Wait for the db to be online before we do any DB requests
async function waitForDb(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      await db.query("SELECT 1");
      return;
    } catch (err) {
      console.log(`DB not ready yet, retrying (${i + 1}/${retries})...`);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
  throw new Error("DB connection timed out");
}

async function insertAirports(data) {
  try {
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);

      const values = [];
      const placeholders = batch.map((row, index) => {
        const offset = index * 14;

        // Push values in the same order as your INSERT fields
        values.push(
          row.id,
          row.name,
          row.city,
          row.country,
          row.iata,
          row.icao,
          row.latitude,
          row.longitude,
          row.altitude,
          row.timezone,
          row.dst,
          row.tzTimezone,
          row.type,
          row.source,
        );

        return `(${Array(14)
          .fill(0)
          .map((_, i) => `$${offset + i + 1}`)
          .join(", ")})`;
      });

      const query = `
        INSERT INTO airports (
          source_id, airport_name, city, country, iata, icao,
          latitude, longitude, altitude, timezone,
          DST, tzdb_timezone, airport_type, source
        ) VALUES ${placeholders.join(", ")}
      `;

      await db.query(query, values);

      console.log("All data inserted in batches.");
    }
  } catch (err) {
    console.error("Insert failed:", err);
  }
}

async function main() {
  const airports = await loadAirportsFromFile();
  console.log(`Parsed ${airports.length} values from data`);
  await waitForDb();
  console.log("DB online");
  await insertAirports(airports);
  exit();
}

main().catch(console.error);
