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
module.exports = {
  logger,
  errHandle,
};
