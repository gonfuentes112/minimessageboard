require("dotenv").config();

const connectionString = process.env.CONNECTION_STRING;
const formattedDate = new Date().toISOString().split("T")[0];

const { Client } = require("pg");
const CREATE = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "user" VARCHAR(50),
        text VARCHAR(255),
        added DATE
    );
    `;
const INSERT = `
    INSERT INTO messages ("user", text, added)
    VALUES
        ($1, $2, $3),
        ($4, $5, $6);
    `;

async function main() {
  console.log("seeding...");
  console.log(connectionString);
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false, // Set this to false if you're using a self-signed certificate
    },
  });
  await client.connect();
  await client.query(CREATE);
  await client.query(INSERT, [
    "Amando",
    "Hi there!",
    new Date(),
    "Charles",
    "Hello World!",
    new Date(),
  ]);
  await client.end();
  console.log("done");
}

main();
