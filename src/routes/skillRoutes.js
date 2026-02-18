const express = require("express")
const { addSkill, GetSkill, deleteSkill } = require("../controllers/skillCon")

const skillRouter = express.Router()
skillRouter.post("/skill", addSkill)
skillRouter.get("/skill", GetSkill)
skillRouter.delete("/skill/:id", deleteSkill)

module.exports = skillRouter