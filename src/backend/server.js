const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 5000; // || process.env.PORT

app.use(cors());
app.use(express.json());

// HELPER FUNCTIONS START HERE

function format_postOI(values) {
  let result = "";

  for (let i = 0; i < values.length; i++) {
    result += "(" + values[i][0] + ", " + values[i][1] + "), ";
  }

  return result.substring(0, result.length - 2);
}

function format_putIC(values) {
  let result = "(";

  for (let i = 0; i < values.length; i++) {
    result += values[i] + ", ";
  }

  result = result.substring(0, result.length - 2);
  result += ")";
  return result;
}

// HELPER FUNCTIONS END HERE

// GET REQUESTS //

// retrieves all items
app.get("/item", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM item;");
    res.json(allItems.rows);
    res.end();
  } catch (err) {
    console.error(err.message);
  }
});

// retrieves all orders (without their associated items)
app.get("/order", async (req, res) => {
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
      'SELECT "name" FROM order_item, item WHERE item.id = order_item.item_id AND order_item.order_id = ' +
        req.query.id +
        ";"
    );
    res.json(items.rows);
    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// retrieves all items associated with each order
app.get("/order_item/all", async (req, res) => {
  try {
    const allOIs = await pool.query(
      'SELECT order_id, "name" FROM order_item, "item" WHERE "item".id = order_item.item_id ORDER BY order_id;'
    );
    res.json(allOIs.rows);
    res.end();
  } catch (err) {
    console.error(err.message);
  }
});

// INSERT REQUESTS //

// adds a new order
app.post("/order", async (req, res) => {
  try {
    const newOrder = await pool.query(
      'INSERT INTO "order" (customer_name, total_cost, num_toppings, time_stamp) VALUES ($1, $2, $3, $4);',
      [req.body.name, req.body.cost, req.body.num_toppings, req.body.date]
    );

    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// associates new order with items
app.post("/order_item", async (req, res) => {
  try {
    let values = [];
    const order_id = req.body.order_id;
    const idList = req.body.ids;

    for (let i = 0; i < idList.length; i++) {
      values.push([order_id, idList[i]]);
    }

    const newOI = await pool.query(
      "INSERT INTO order_item (order_id, item_id) VALUES " +
        format_postOI(values) +
        ";",
      []
    );

    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// adds new item
app.post("/item/add_item", async (req, res) => {
  try {
    await pool
      .query(
        "INSERT INTO item (name, count, price, type) VALUES ($1, $2, $3, $4);",
        [req.body.name, req.body.count, req.body.price, req.body.type]
      )
      .then((inserted) => {
        res.status(200).send({
          response: `Inserted ${inserted.rowCount} rows`,
        });
      })
      .catch((err) => res.status(500).send({ error: err }));
  } catch (err) {
    console.log(err.message);
  }
});

// UPDATE REQUESTS //

// decrements an item's inventory
app.put("/item/count", async (req, res) => {
  try {
    let values = [];
    const idList = req.body.ids;

    for (let i = 0; i < idList.length; i++) {
      values.push(idList[i]);
    }

    const updateItem = await pool.query(
      'UPDATE "item" SET count = count - 1 WHERE id IN ' +
        format_putIC(values) +
        ";",
      []
    );

    res.end();
  } catch (err) {
    console.log(err.message);
  }
});

// DELETE REQUESTS //

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
