const expressAsyncHandler = require("express-async-handler");
const educationModel = require("../model/educationModel");

const getAll = expressAsyncHandler(async (req, res) =>{
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 0

    const result = await educationModel.findAll(page, limit)
    const total_pages = Math.ceil(education.total / limit)
    
    return res.json({
        message: "Find education successfully!",
        status: true,
        pagination: {
            current_pages: page,
            total_pages,
            limit: limit,
            total_education: result.total
        },
        data: result.education
    })
    
})

module.exports = { getAll }