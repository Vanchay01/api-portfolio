const express = require("express")
const { addImageWork } = require("../controllers/imageWorkCon")
const { array } = require("../middleware/upload")
const upload = require("../middleware/upload")

const imageWorkRouter = express.Router()

imageWorkRouter.post(
    '/image_work', 
    upload.array("image", 10),
    addImageWork
)

module.exports = imageWorkRouter