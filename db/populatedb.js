require("dotenv").config();
const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const pass = process.env.DATABASE_PASSWORD;
const dbname = process.env.DATABASE_NAME;
const connectionString = `postgres://${user}:${pass}@${host}/${dbname}`;

const { Client } = require("pg");
const SQL = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user VARCHAR(50),
        text VARCHAR(255),
        added DATE
    );

    INSERT INTO messages (user, text, added)
    VALUES
        ('Amando', 'Hi there!', ${new Date()}),
        ('Charles', 'Hello World!', ${new Date()});
    `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false, // Set this to false if you're using a self-signed certificate
      }
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
