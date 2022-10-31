const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "FIXME",
  host: "FIXME",
  port: "FIXME", // this is a number
  database: "FIXME",
});

module.exports = pool;
