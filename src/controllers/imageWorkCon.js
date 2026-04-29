
const asyncHandler = require("express-async-handler")
const imageWorkService = require("../services/imageWorkService")

const addImageWork = asyncHandler(async(req, res)=>{
    const {by_work} = req.body
    const image = req.files
    console.log(image)
    const result = await imageWorkService.createrService({image: image, by_work: by_work})
    if(!result || result.length === 0){
        return res.json({
            message: "Create Image of work is error",
            status: false
        })
    }
    return res.json({
        message: "Created Image of work successfully..",
        status: true,
        data: result
    })
})

const getImageWork = asyncHandler(async(req, res) => {
    const page = parseInt(req.query.page) || 0
    const limti = parseInt(req.query.limit) || 0
    const result = await imageWorkService.find({page: page, limit: limti})
    if(!result || result === 0){
        return res.json({
            message: "Iamge work is not found...",
            status: false
        })
    }
    return res.json({
        message: "find image work is successfully...",
        status: true,
        data: result
    })
})
const deleteImageWork = asyncHandler(async(req, res)=>{
    const id = req.params.id
    console.log(id)
    const result = await imageWorkService.deleteOneService({id: id})
    return res.json({
        message: "Deleted image work successfully...",
        status: true,
        data: result
    })
})

module.exports = {addImageWork, deleteImageWork, getImageWork}