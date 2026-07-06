const mongoose = require('mongoose');
const ApiResponse = require('../utils/ApiResponse');

const checkDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json(
      new ApiResponse(
        503,
        'Database not connected. Please whitelist your IP in MongoDB Atlas Network Access.'
      )
    );
  }
  next();
};

module.exports = { checkDBConnection };
