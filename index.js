const express = require("express");
const pool = require("./src/config/db");
const app = express();
require("dotenv").config();

pool
  .connect()
  .then(() => console.log("✅ Index.js => Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err));

app.use("/api/skill", async (req, res) => {
  const query = await pool.query("Select * from work");
  console.log("asdasda", query.rows);
  return res.json({
    result: query.rows,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Example app listening on port ${process.env.PORT} `);
  console.log(`✅ API === http://localhost:${process.env.PORT}/api`);
});
