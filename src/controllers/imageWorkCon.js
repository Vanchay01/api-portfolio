
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

module.exports = {addImageWork}