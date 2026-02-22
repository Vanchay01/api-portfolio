const express = require("express");
const pool = require("./src/config/db");
// const cors = require("cors");
const body_parser = require("body-parser")
const scriptDB = require("./src/config/scriptDB");
const skillRouter = require("./src/routes/skillRoutes");
const { errHandle, logger } = require("./src/middleware");
const upload = require("./src/middleware/upload");
const app = express();
require("dotenv").config();




app.use(logger);
pool
  .connect()
  .then(() => console.log("✅ Index.js => Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err));
  
scriptDB()
// app.use(cors()); // allow frontend requests
app.use(body_parser.json())
app.use('/api', skillRouter)


app.post('/uploads', upload, async(req, res) =>{
  console.log(req.file)
  if(req.file){
    throw new Error("Upload image failed!")
  }else{
    const file = new File(req.file)
    const result = await file.save()
    return res.status(200).json({
      message: "Upload image successfully",
      data: result
    })
  }
})
app.use(errHandle)

app.listen(process.env.PORT, () => {
  console.log(`✅ Example app listening on port ${process.env.PORT} `);
  console.log(`✅ API === http://localhost:${process.env.PORT}/api`);
});
