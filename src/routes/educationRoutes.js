const express = require("express")
const { getAll } = require("../controllers/educationCon")

const educationRouter = express.Router()

educationRouter.get("/education", getAll)

module.exports = educationRouter