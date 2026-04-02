const expressAsyncHandler = require("express-async-handler");
const workModel = require("../model/workModel");
const workService = require("../services/workService");

const getWorkImage = expressAsyncHandler(async(req, res) => {
    const result = await workModel.findImage()
    if(result.length == 0){
        return res.json({
            message: "Work not found..",
        })
    }
    return res.json({
        message: "Get All successfully",
        result
    })
})

const getWork = expressAsyncHandler(async(req, res) => {
    const result = await workModel.find()
    if(result.length == 0){
        return res.json({
            message: "Work not found..",
        })
    }
    return res.json({
        message: "Get All successfully",
        result
    })
})

const addWork = expressAsyncHandler(async(req, res) => {
    const { name, position, framework, github, demo, description } = req.body;
    const files = req.files
    console.log("data:",name, position, framework, github, demo, description)
    console.log("file:",files)

    const result = await workService.saveFull(name, position, framework, github, demo, description, files)
    console.log("ok")
    // const result = await workModel.create({name: name, files: files})
    // // if(result){
    // //     return res.json({
    // //         message: "Work created Failed "
    // //     })
    // // }
    return res.json({
        message: "Work created successfully",
        status: true,
        data: result
    })
})
module.exports = { getWork, addWork, getWorkImage }