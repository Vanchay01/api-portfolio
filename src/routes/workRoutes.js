const express = require("express")
const { addWork, getWorkById, getWork, } = require("../controllers/workCon")
const upload = require("../middleware/upload")

const workRouter = express.Router()

workRouter.post(
    "/work",
    upload.array("image", 10),
    addWork
)
workRouter.get(
    '/work',
    getWork
)
workRouter.get(
    "/work/:id",
    getWorkById
)

module.exports = workRouter