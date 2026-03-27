const express = require("express")
const { getEducation, addEducation, getEducationById, deleteEudcation, updateEducation } = require("../controllers/educationCon")
const { uploadImageSkill } = require("../model/imageModel")
const upload = require("../middleware/upload")

const educationRouter = express.Router()

educationRouter.post("/education", upload.single("image"), addEducation)
educationRouter.get("/education", getEducation)
educationRouter.get("/education/:id", getEducationById)
educationRouter.delete("/education/:id", deleteEudcation)
educationRouter.put("/education/:id", upload.single("image"), updateEducation)

module.exports = educationRouter