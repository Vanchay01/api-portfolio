const express = require("express")
const { addSkill, GetSkill, deleteSkill } = require("../controllers/skillCon")
const upload = require("../middleware/upload")


const skillRouter = express.Router()
skillRouter.post("/skill", upload, addSkill)
skillRouter.get("/skill", GetSkill)
skillRouter.delete("/skill/:id", deleteSkill)

module.exports = skillRouter