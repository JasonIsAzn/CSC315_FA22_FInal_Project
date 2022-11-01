const express = require("express");
const app = express();
const cors = require("cors")
const pool = require("./db");


app.use(cors());
app.use(express.json());

// Add process hook to shutdown pool
process.on('SIGINT', function() {
  pool.end();
  console.log('Application successfully shutdown');
  process.exit(0);
});

// ROUTES // 
// get Items
app.get("/items" , async (req, res) => {
  try{
    const orders = await pool.query("SELECT * FROM item");
    res.json(orders.rows);
  } catch {err} {
    console.error(err.message);
  }
});


app.listen(5000, () => {
  console.log("Listening on port 5000");
});
