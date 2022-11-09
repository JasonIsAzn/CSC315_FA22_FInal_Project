const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//// ROUTES ////

// GETS 
// get-items
app.get("/items" , async (req, res) => {
  try{
    const orders = await pool.query("SELECT * FROM item");
    res.json(orders.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/orders" , async (req, res) => {
  try{
    const orders = await pool.query("SELECT * FROM \"order\"");
    res.json(orders.rows);
  } catch (err) {
    console.error(err.message);

// =======

// // GETS
// // get-items
// app.get("/items", async (req, res) => {
//   try {
//     const allItems = await pool.query("SELECT * FROM item;");
//     res.json(allItems.rows);
//     res.end();
//   } catch (err) {
//     console.log(err.message);
// >>>>>>> main

  }
});

// INSERTS
// DELETES

app.listen(5001, () => {
  console.log("Listening on port 3001");
});