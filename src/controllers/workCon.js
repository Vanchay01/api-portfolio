const asyncHandler = require("express-async-handler");
const workModel = require("../model/workModel");
const workService = require("../services/workService");
const { body } = require("express-validator");
// add 
const addWork = asyncHandler(async(req, res) => {
    const {name, position, github, demo, framework, description} = req.body
    const image = req.files 
    console.log("sss", image)
    const result = await workService.saveFull({ name: name, position: position, github: github, demo: demo, framework: framework, description: description, image: image,})
    return res.json({
        message: "Work created successfully",
        data: result
    })
})
// find
const getWork = asyncHandler(async(req, res)=> {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 0
    const result = await workModel.find({page: page, limit: limit})
    if(!result.work.length){
        return res.json({
            message: "work not fount",
            status: false
        })
    }
    return res.json({
        message: "find work is successfully...",
        status: true,
        pagination: {
            current_page: page,
            // total_pages,
            limit: limit,
            work: result.total
        },
        data: result.work
    })
})
// find one by id 
const getWorkById = asyncHandler(async(req, res)=> {
    const id = req.params.id
    const result = await workService.serviceFind({id: id})
    // const result = await workModel.findOne(id)
    if(result === false){
        return res.json({
            message: "Work not found..",
            status: false
        })
    }
    return res.json({
        message: "Work created successfully",
        status: true,
        data: result
    })
})
// update one
const updateWork = asyncHandler(async(req, res) => {
    const id = req.params.id
    const {name, position, github, demo, framework, description} = req.body
    const image = req.files
    const result = await workService.serviceUpdate({
        id: id,
        name: name,
        position: position,
        github: github,
        demo: demo,
        framework: framework,
        description: description
    })
    if(result === null){
        return res.json({
            message: "Name of work already exists. Please choose a different name.",
            status: false,
        });
    }
    return res.json({
        message: "Updated work successfully",
        status: true,
        data: result
    })
})
module.exports = { addWork, getWork, getWorkById, updateWork }
