const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Create a new pool instance
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "RecipeDB",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
