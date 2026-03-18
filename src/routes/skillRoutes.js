const express = require("express")
const { addSkill, GetSkill, deleteSkill, getByID, updateSkill } = require("../controllers/skillCon")
const upload = require("../middleware/upload")
const { skillValidation } = require("../common/validation/skillValidation")
const { validate } = require("../middleware")


const skillRouter = express.Router()
skillRouter.post("/skill", upload.single("image"),skillValidation, validate, addSkill)
skillRouter.get("/skill", GetSkill)
skillRouter.get("/skill/:id", getByID)
skillRouter.delete("/skill/:id", deleteSkill)
skillRouter.put("/skill/:id",upload.single('image'), updateSkill)

module.exports = skillRouter