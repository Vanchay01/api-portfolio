const { validationResult } = require("express-validator");

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const errHandle = (err, req, res, next) => {
    console.log(err.message)
    return res.status(500).json({
        Message: "SERVER IS DOWN",
        Error: err.message
    })
};

// validatior
const validate = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    next();
  } else {
    console.log({ error: result.array() })
    return res.status(401).json({ error: result.array() });
  }
};

module.exports = {
  logger,
  errHandle,
  validate,
};
