const express = require("express")
const { addWork, getWorkById, getWork, updateWork, } = require("../controllers/workCon")
const upload = require("../middleware/upload")

const workRouter = express.Router()

// add 
workRouter.post(
    "/work",
    upload.array("image", 10),
    addWork
)
// get
workRouter.get(
    '/work',
    getWork
)
// get by id
workRouter.get(
    "/work/:id",
    getWorkById
)
// update one
workRouter.put(
    "/work/:id",
    upload.array("image", 10),
    updateWork
)

module.exports = workRouter