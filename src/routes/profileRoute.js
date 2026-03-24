const express = require("express")
const { getProfile, editProfile, addProfile } = require("../controllers/profileCon")
const upload = require("../middleware/upload")
const profileRouter = express.Router()

profileRouter.get("/profile", getProfile)
profileRouter.post("/profile", addProfile)
profileRouter.put("/profile/:id", upload.single("image"), editProfile)

module.exports = profileRouter