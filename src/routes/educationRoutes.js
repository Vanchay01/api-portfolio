const express = require("express")
const { getEducation, addEducation } = require("../controllers/educationCon")
const { uploadImageSkill } = require("../model/imageModel")
const upload = require("../middleware/upload")

const educationRouter = express.Router()

educationRouter.post("/education", upload.single("image"), addEducation)
educationRouter.get("/education", getEducation)

module.exports = educationRouter