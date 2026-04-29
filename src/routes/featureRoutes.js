const express = require("express")
const { AddFeature } = require("../controllers/featureCon")
const featureRouter = express.Router()

featureRouter.post(
    "/feature", 
    AddFeature
)


module.exports = featureRouter