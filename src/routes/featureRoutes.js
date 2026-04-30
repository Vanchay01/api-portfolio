const express = require("express")
const { AddFeature, deleteFeature, getFeature } = require("../controllers/featureCon")
const { deleteTool } = require("../controllers/toolCon")
const featureRouter = express.Router()

featureRouter.post(
    "/", 
    AddFeature
)
featureRouter.get(
    "/", 
    getFeature
)
featureRouter.delete(
    '/:id',
    deleteFeature
)

module.exports = featureRouter