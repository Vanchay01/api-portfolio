const pool = require("../config/db");
const tryCatch = require("express-async-handler");
const skillModel = require("../model/skillModel");
const imageModel = require("../model/imageModel");

const addSkill = tryCatch(async (req, res) => {
    const { name, rating } = req.body;
    const image = req.file ? req.file.filename : null
    const result = await skillModel.save({name: name, rating: rating, image: image})
    return res.json({
      message: "Skill created successfully",
     data: result,
    })
});

const GetSkill = tryCatch(async (req, res) => {
  const result = await skillModel.find();
  if (result.length == 0) {
    return res.status(400).json({
      message: "Find Skill Not Found!",
    });
  }
  return res.status(200).json({
    message: "Find Skill successfully",
    data: result,
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

module.exports = { addSkill, GetSkill, deleteSkill, getByID };
