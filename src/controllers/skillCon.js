const pool = require("../config/db");
const tryCatch = require("express-async-handler");
const skillModel = require("../model/skillModel");
const imageModel = require("../model/imageModel");

const addSkill = tryCatch(async (req, res) => {
  const client = await pool.connect();
  try{
    const { name, rating } = req.body;
    await pool.query("BEGIN")
    const skill = await skillModel.save(client, {name: name, rating: rating})
    if(req.file){
      await imageModel.uploadImageSkill(client, req.file, skill.id)
    }
    await pool.query("COMMIT");
    
    return res.status(201).json({
      message: "Created Skill successfully",
      data: skill,
    });
  }catch(error){
    await client.query("ROLLBACK")
    throw error
  }finally{
    client.release()
  }
});

const GetSkill = tryCatch(async (req, res) => {
  const result = await skillModel.find();
  if (result.length == 0) {
    return res.status(400).json({
      message: "Find Skill failed!",
    });
  }
  return res.status(200).json({
    message: "Find Skill successfully",
    data: result,
  });
});

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

module.exports = { addSkill, GetSkill, deleteSkill };
