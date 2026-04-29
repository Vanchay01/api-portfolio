const express = require("express")
const { AddFeature, deleteFeature } = require("../controllers/featureCon")
const { deleteTool } = require("../controllers/toolCon")
const featureRouter = express.Router()

featureRouter.post(
    "/", 
    AddFeature
)
featureRouter.delete(
    '/:id',
    deleteFeature
)

module.exports = featureRouter