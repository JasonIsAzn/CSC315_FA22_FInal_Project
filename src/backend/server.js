const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// GET REQUESTS //

// retrieves all items
app.get("/items", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM item;");
    res.json(allItems.rows);
    // pool.query("SELECT * FROM item;").then((allItems) => {
    //   res.status(200).send({
    //     response: allItems.rows
    //   })
    // })
    res.end();
  } catch (err) {
    console.error(err.message);
  }
});

// retrieves all orders (without their associated items)
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

// INSERT REQUESTS //

// adds a new order
app.post("/order", async (req, res) => {
  try {
    const newOrder = await pool.query(
      'INSERT INTO "order" (customer_name, total_cost, num_toppings, time_stamp, server_id) VALUES ($1, $2, $3, $4, $5);',
      [
        req.body.name,
        req.body.cost,
        req.body.num_toppings,
        req.body.date,
        req.body.server_id,
      ]
    );

    console.log(newOrder); // DELETEME
    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// associates new order with items
app.post("/order_item", async (req, res) => {
  try {
    const newOI = await pool.query(
      "INSERT INTO order_item (order_id, item_id) VALUES ($1, $2);",
      [req.body.order_id, req.body.item_id]
    );

    console.log(newOI); // DELETEME
    res.end();
  } catch (err) {
    console.log(err.message);
  }
});
app.post("/items/add_item", async (req, res) => {
  try {
    // const add_item
    await pool.query(
      "INSERT INTO item (name, count, price, type) VALUES ($1, $2, $3, $4);",
      [req.body.name, req.body.count, req.body.price, req.body.type]
    ).then((inserted) => {
      res.status(200).send({
        response: `Inserted ${inserted.rowCount} rows`
      })
    }).catch(err => res.status(500).send({error: err}))
  } catch (err) {
    console.log(err.message)
  }
})

// adds an item (TODO)

// UPDATE REQUESTS //

// decrements an item's inventory
app.put("/items/count", async (req, res) => {
  try {
    const updateItem = await pool.query(
      'UPDATE "item" SET count = count - 1 WHERE id = $1;',
      [req.body.id]
    );

    console.log(updateItem); // DELETEME
    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// DELETE REQUESTS //

app.listen(5001, () => {
  console.log("Listening on port 5001");
});
