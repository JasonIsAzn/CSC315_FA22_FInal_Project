const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//// ROUTES ////

// GETS
// retrieves all items from database
app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM item;");
    res.json(allItems.rows);
    res.end();
  } catch (err) {
    console.error(err.message);
  }
});

// retrieves all orders (without their associated items) from database
app.get("/orders", async (req, res) => {
  try {
    const allOrders = await pool.query('SELECT * FROM "order";');
    res.json(allOrders.rows);
    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// retrieves all items associated with a given order
app.get("/order_item", async (req, res) => {
  try {
    const items = await pool.query(
      "SELECT name FROM order_item, item WHERE item.id = order_item.item_id AND order_item.order_id = " +
        req.params.id +
        ";"
    );
    res.json(items.rows);
    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// INSERTS
// UPDATES
// DELETES

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
