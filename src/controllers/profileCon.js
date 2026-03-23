const expressAsyncHandler = require("express-async-handler")
const profileModel = require("../model/profileModel");

const getProfile = expressAsyncHandler(async (req, res) => {
    const result = await profileModel.find()
    if(result.length == 0){
        return res.json({
            message: "Profile not found",
            status: false
        })
    }
    return res.json({
        message: "Find profile successfully",
        status: true,
        data: result,
    })
})

module.exports = { getProfile }