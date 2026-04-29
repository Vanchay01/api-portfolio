const express = require("express");
const pool = require("./src/config/db");
const cors = require("cors");
const body_parser = require("body-parser")
const scriptDB = require("./src/config/scriptDB");
const skillRouter = require("./src/routes/skillRoutes");
const { errHandle, logger } = require("./src/middleware");
const workRouter = require("./src/routes/workRoutes");
const profileRouter = require("./src/routes/profileRoute");
const educationRouter = require("./src/routes/educationRoutes");
const imageWorkRouter = require("./src/routes/imageWorkRoute");
const featureRouter = require("./src/routes/featureRoutes");
const toolRouter = require("./src/routes/toolRoutes");
const app = express();
require("dotenv").config();

// middleware
app.use(logger);
pool
  .connect()
  .then(() => console.log("✅ Index.js => Connected to PostgreSQL - index.js:21"))
  .catch((err) => console.error("❌ DB connection error: - index.js:22", err));
scriptDB()
app.use(cors()); // allow frontend requests
app.use(body_parser.json())
app.use("/uploads", express.static("uploads")); //This lets the browser access images like: http://localhost:5000/uploads/image-17100022222.png
// route
app.use('/api', profileRouter)
app.use('/api', skillRouter)
app.use('/api', educationRouter)
app.use('/api', workRouter)
app.use('/api/feature', featureRouter)
app.use('/api/tool', toolRouter)
// route for image
app.use('/api/image_work', imageWorkRouter)

app.use(errHandle)

app.listen(process.env.PORT, () => {
  console.log(`✅ Example app listening on port ${process.env.PORT} - index.js:40`);
  console.log(`✅ API === http://localhost:${process.env.PORT}/api - index.js:41`);
});
