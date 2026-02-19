const pool = require("../config/db");
const tryCatch = require("express-async-handler");
const skillModel = require("../model/skillModel");
const { default: cloudinary } = require("../config/cloudinary");

const addSkill = tryCatch(async (req, res) => {
  const { name, rating } = req.body;
  let image = null;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "skills",
    });
    image = result.secure_url;
  }


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
