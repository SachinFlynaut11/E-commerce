const ApiResponse = require('../utils/ApiResponse');

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json(
    new ApiResponse(statusCode, err.message || 'Server Error', null)
  );
};

module.exports = { notFound, errorHandler };
