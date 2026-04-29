const asyncHandler = require("express-async-handler")
const featureService = require("../services/featureService")

const AddFeature = asyncHandler(async(req, res) => {
    const {name, description, by_work} = req.body
    console.log("name")
    const result = await featureService.create({name: name, description: description, by_work: by_work})
    return res.json({
        mesaage: "add new feature successfully..",
        status: true,
        data: result
    })
})


module.exports = {AddFeature}