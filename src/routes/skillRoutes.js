const express = require("express")
const multer = require("multer")
const { addSkill, GetSkill, deleteSkill } = require("../controllers/skillCon")

const upload = multer({ dest: "uploads/" })

const skillRouter = express.Router()
skillRouter.post("/skill", upload.single("image"), addSkill)
skillRouter.get("/skill", GetSkill)
skillRouter.delete("/skill/:id", deleteSkill)

module.exports = skillRouter