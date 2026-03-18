const { body } = require("express-validator");
const pool = require("../../config/db");

const skillValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage("Skill name is required!!")
        .isLength({min: 2, max: 50}).withMessage('Name must be 2-50 characters')
        .custom(async (name) => {
            const result = await pool.query("SELECT * FROM skill WHERE name = $1 LIMIT 1", [name]);
            if(result.rows.length > 0){
                throw new Error("Skill already exists")
            }
        }),
]
module.exports = {
  skillValidation
};