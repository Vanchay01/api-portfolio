const asyncHandler = require("express-async-handler")
const featureService = require("../services/featureService")

const AddFeature = asyncHandler(async(req, res) => {
    const {name, description, by_work} = req.body
    console.log("name - featureCon.js:6")
    const result = await featureService.create({name: name, description: description, by_work: by_work})
    return res.json({
        mesaage: "add new feature successfully..",
        status: true,
        data: result
    })
})
const deleteFeature = asyncHandler(async(req, res) => {
    const id = req.params.id
    const result = await featureService.deleteOne({id: id})
    if(!result || result === 0){
        return res.json({
            message: 'delete tool is failed..',
            status: false
        })
    }
    return res.json({
        message: 'deleted tool is successfully...',
        status: true,
        data: result
    })
})


module.exports = {AddFeature, deleteFeature}