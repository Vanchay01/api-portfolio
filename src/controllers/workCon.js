const expressAsyncHandler = require("express-async-handler");
const workModel = require("../model/workModel");
const workService = require("../services/workService");

// add work
const addWork = expressAsyncHandler(async(req, res) => {
    const { name, position, framework, github, demo, description } = req.body;
    const files = req.files
    const existsing = await workModel.findOne({name: name})
    if (existsing.length > 0) {
        return res.json({
            message: "Work name already exists",
            status: false,
        });
    }
    const result = await workService.saveFull(name, position, framework, github, demo, description, files)
    return res.json({
        message: "Work created successfully",
        status: true,
        data: result
    })
})

// get work
const getWork = expressAsyncHandler(async(req, res) => {
    const pages = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;
    const result = await workModel.find(pages, limit)
    if(result.length == 0){
        return res.json({
            message: "Work not found..",
            status: false
        })
    }
    const items_in_page = Math.ceil(result.total / limit) 
    return res.json({
        message: "Get All successfully",
        status: true,
        pagination: {
            total: result.total,
            current_pages: pages,
            limit: limit,
            items_in_page
        },
        data: result.work,
    })
})

// get by id
const getWorkId = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const sql = await workModel.findOne({id: id})
    if(sql == 0){
        return res.json({
            message: "work not found....",
            status: false
        })
    }
    return res.json({
        message: "find one work is successfully...",
        status: true,
        date: sql
    })
})
// delete work

// update work
module.exports = { getWork, addWork, getWorkId }