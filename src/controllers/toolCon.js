const asyncHandler = require("express-async-handler")
const toolService = require("../services/toolService")

const addTool = asyncHandler(async(req, res) => {
    const {name, by_technology} = req.body
    console.log(by_technology)
    const result = await toolService.create({name: name, by_technology: by_technology})
    if(!result || result === 0){
        return res.json({
            message: 'create new tool is failed..',
            status: false
        })
    }
    return res.json({
        message: 'Created new tool is successfully...',
        status: true,
        data: result
    })
})
const deleteTool = asyncHandler(async(req, res) => {
    const id = req.params.id
    const result = await toolService.deleteOne({id: id})
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

module.exports = {addTool, deleteTool}