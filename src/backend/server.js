const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//// ROUTES ////

// GETS
// get-items
app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM item;");
    res.json(allItems.rows);
    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// INSERTS
// DELETES

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
