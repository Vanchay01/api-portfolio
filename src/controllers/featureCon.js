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
const getFeature = asyncHandler(async(req, res) => {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 0
    const result = await featureService.find({page: page, limit:limit})
    if(!result || result === 0){
        return res.json({
            message: 'feature is not found...',
            status: false
        })
    }
    const this_page_total = Math.ceil(result.total / limit) 
    return res.json({
        message: 'find feature is successfully...',
        status: true,
        pagination: {
            current_page: page,
            limit: limit,
            this_page_total: this_page_total,
            all_total:  result.total
        },
        data: result.feature
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


module.exports = {AddFeature, deleteFeature, getFeature}