const express = require("express")
const { addSkill, GetSkill } = require("../controllers/skillCon")

const skillRouter = express.Router()
skillRouter.post("/skill", addSkill)
skillRouter.get("/skill", GetSkill)

module.exports = skillRouter