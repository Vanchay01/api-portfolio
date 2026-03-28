const expressAsyncHandler = require("express-async-handler");
const educationModel = require("../model/educationModel");
// Add Education
const addEducation = expressAsyncHandler(async (req, res) =>{
    const id = req.params.id || null
    const {name, major, gpa, year} = req.body
    const image = req.file ? req.file.filename : null
    
    const existing = await educationModel.findOne({name: name})
    if(existing.length > 0) {
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
            message: "Record education not found!",
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

// Get education by id
const getEducationById = expressAsyncHandler(async(req, res) => {
    const id = req.params.id

    const result = await educationModel.findOne({id: id})
    if(!result.length > 0){
        return res.json({
            message: `Record not found..`,
            status: false
        })
    }
    return res.json({
        message: `Found record successfully.`,
        status: true,
        data: result
    })
})

// Update education
const updateEducation = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const {name, major, gpa, year} = req.body
    const image = req.file ? req.file.filename : null

    const existing = await educationModel.findName({name: name, id: id})
    if(existing.length > 0){
        return res.json({
            message: "Education name already exists. Please choose a different name.",
            status: false
        })
    }

    const result = await educationModel.updateOne(name, image, major, gpa, year, id)
    return res.json({
        message: "Updated education successfully.",
        status: true,
        data: result
    })
})

// Delete Education 
const deleteEudcation = expressAsyncHandler(async(req, res) => {
    const id = req.params.id
    const result = await educationModel.deleteOne(id)
     if (result.length == 0) {
        return res.json({
        message: "Delete education failed!",
        status: false
        });
    }
    return res.json({
        message: `Delected education successfully.`,
        status: true,
        data: result
    })
})

module.exports = { getEducation, addEducation, updateEducation, deleteEudcation, getEducationById }