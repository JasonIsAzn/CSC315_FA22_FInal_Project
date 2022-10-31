const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());
pool.connect(); // FIXME: may want to try-catch this to ensure connection

// pool.query(...) - used to make queries

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
