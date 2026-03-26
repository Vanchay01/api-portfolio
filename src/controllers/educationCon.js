const expressAsyncHandler = require("express-async-handler");
const educationModel = require("../model/educationModel");
// Add Education
const addEducation = expressAsyncHandler(async (req, res) =>{
    const id = req.params.id || null
    const {name, major, gpa, year} = req.body
    const image = req.file ? req.file.filename : null
    
    const existing = await educationModel.findOne(id, name)
    if(existing) {
        return res.json({
            message: "Education name existing already!!",
            status: false,
            data: existing
        })
    }

    const result = await educationModel.save(name, image, major, gpa, year)
    return res.json({
        message: "Created education successfully...",
        status: true,
        data: result
    })
})

// Get Education
const getEducation = expressAsyncHandler(async (req, res) =>{
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 0
    const offset = (page - 1) * limit

    const result = await educationModel.findAll(offset, limit)
    if(!result.education.length){
        return res.json({
            message: "Record Not Found!",
            status: false
        })
    }

    const total_pages = Math.ceil(result.total / limit)
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

module.exports = { getEducation, addEducation }