const express = require("express")
<<<<<<< HEAD
const { addWork, getWorkById, getWork, } = require("../controllers/workCon")
=======
const { addWork, getWork, getWorkId } = require("../controllers/workCon")
>>>>>>> 23d1b8b5eb81178936b6e60d3016a8b5fe87b75a
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
<<<<<<< HEAD
    getWorkById
=======
    getWorkId
>>>>>>> 23d1b8b5eb81178936b6e60d3016a8b5fe87b75a
)

module.exports = workRouter