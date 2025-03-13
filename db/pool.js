require('dotenv').config()
const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false, // Set this to false if you're using a self-signed certificate
  },
});