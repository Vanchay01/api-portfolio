const { validationResult } = require("express-validator");

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const errHandle = (err, req, res, next) => {
    return res.status(500).json({
        Message: "SERVER IS DOWN",
        Error: err.message
    })
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  logger,
  errHandle,
  validate,
};
