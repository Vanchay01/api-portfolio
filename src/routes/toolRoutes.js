

const express = require("express")
const { addTool, deleteTool, getTool } = require("../controllers/toolCon")

const toolRouter = express.Router()

toolRouter.post(
    '/',
    addTool
)
toolRouter.get(
    '/',
    getTool
)
toolRouter.delete(
    '/:id',
    deleteTool
)

module.exports = toolRouter