const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "holdings",
  password: "anish",
  port: "5432",
});

module.exports = pool;
