const express = require("express")
const { addImageWork, deleteImageWork, getImageWork } = require("../controllers/imageWorkCon")
const { array } = require("../middleware/upload")
const upload = require("../middleware/upload")

const imageWorkRouter = express.Router()

imageWorkRouter.post(
    '/', 
    upload.array("image", 10),
     
)

imageWorkRouter.get(
    '/',
    getImageWork
)

imageWorkRouter.delete(
    '/:id',
    deleteImageWork
)

module.exports = imageWorkRouter    