const express = require("express")
const { getProfile } = require("../controllers/profileCon")
const profileRouter = express.Router()

profileRouter.get("/profile", getProfile)

module.exports = profileRouter