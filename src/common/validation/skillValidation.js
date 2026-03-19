const { body } = require("express-validator");
const pool = require("../../config/db");

const skillValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage("Skill name is required!!")
        .isLength({min: 2, max: 50}).withMessage('Name must be 2-50 characters'),
        body("rating")
            .trim()
            .notEmpty().withMessage("Skill rating is required!!")
]
module.exports = {
  skillValidation
};