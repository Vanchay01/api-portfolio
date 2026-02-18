const pool = require("../config/db");
const tryCatch = require("express-async-handler");
const skillModel = require("../model/skillModel");

const addSkill = tryCatch(async (req, res) => {
  const { name, image, rating } = req.body;
  console.log(name);
  const result = await pool.query(
    `INSERT INTO skill(name, image, rating) VALUES($1, $2, $3) RETURNING *`,
    [name, image, rating],
  );

  return res.status(201).json({
    message: "Created Skill successfully",
    data: result.rows,
  });
});

const GetSkill = tryCatch(async (req, res) => {
  const result = await skillModel.find();
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
      message: "Not Found....!",
    });
  }
  return res.status(200).json({
    message: "Delete Skill successfully",
    data: result,
  });
});

module.exports = { addSkill, GetSkill, deleteSkill };
