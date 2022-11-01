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



app.listen(5000, () => {
  console.log("Listening on port 5000");
});
