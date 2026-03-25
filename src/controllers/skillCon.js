const pool = require("../config/db");
const tryCatch = require("express-async-handler");
const skillModel = require("../model/skillModel");
const imageModel = require("../model/imageModel");

const addSkill = tryCatch(async (req, res) => {
    const { name, rating } = req.body;
    const image = req.file ? req.file.filename : null
    
    const existsing = await skillModel.findName({name: name})
    if(existsing.length > 0){
      return res.json({
        message: "Skill name already exists",
        status: false
      })
    }
    const result = await skillModel.save({name: name, rating: rating, image: image})
    return res.json({
      message: "Skill created successfully",
      status: true,
      data: result, 
    })
});

const GetSkill = tryCatch(async (req, res) => {
  const page = parseInt(req.query.page) || 0
  const limit = parseInt(req.query.limit) || 0
  const result = await skillModel.find({page: page, limit: limit});
  const total_pages = Math.ceil(result.total / limit)
  return res.status(200).json({
    message: "Find Skill successfully",
    pagination: {
      current_pages: page,
      total_pages,
      limit: limit,
      total_skill: result.total,
    },
    data: result.skill,
  });
});

const getByID = tryCatch(async(req, res) => {
  const id = req.params.id
  const result = await skillModel.findOne({id: id})
  if (result.length == 0) {
    return res.status(400).json({
      message: "Find Skill Not Found!",
    });
  }
  return res.status(200).json({
    message: "Find Skill successfully",
    data: result,
  });
})

const deleteSkill = tryCatch(async (req, res) => {
  const id = req.params.id;
  const result = await skillModel.deleteOne({ id: id });
  if (result.length == 0) {
    return res.status(400).json({
      message: "Delete Skill failed!",
    });
  }
  return res.status(200).json({
    message: "Delete Skill successfully",
    data: result,
  });
});

const updateSkill = tryCatch(async(req, res)=> {
  const id = req.params.id || req.body.id
  const image = req.file ? req.file.filename : null
  const {name, rating} = req.body
  const existing = await skillModel.findName({name: name, id: id})
  if(existing.length > 0){
    return res.json({
      message: "Skill name already exists. Please choose a different name.",
      status: false
    })
  }
  const result = await skillModel.updateOne({id: id, name: name, rating: rating, image: image})
  return res.status(200).json({
    message: "Updated  Skill successfully",
    data: result,
  });
})

module.exports = { addSkill, GetSkill, deleteSkill, getByID, updateSkill };
