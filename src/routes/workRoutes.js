const express = require("express")
const { addWork, getWork, getWorkImage } = require("../controllers/workCon")
const upload = require("../middleware/upload")

const workRouter = express.Router()

workRouter.post(
    "/work",
    upload.array("image", 10),
    addWork
)
workRouter.get(
    "/work",
    getWork
)
workRouter.get(
    "/works",
    getWorkImage
)

module.exports = workRouter