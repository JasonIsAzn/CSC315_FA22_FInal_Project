const Pool = require("pg").Pool;

const pool = new Pool({
  user: "csce315_909_le",
  password: "131000254",
  host: "csce-315-db.engr.tamu.edu",
  port: "5432",
  database: "csce315_909_92",
  ssl: {rejectUnauthorized: false}
});

module.exports = pool;