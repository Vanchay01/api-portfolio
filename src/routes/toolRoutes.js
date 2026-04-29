

const express = require("express")
const { addTool, deleteTool } = require("../controllers/toolCon")

const toolRouter = express.Router()

toolRouter.post(
    '/',
    addTool
)
toolRouter.delete(
    '/:id',
    deleteTool
)

module.exports = toolRouter