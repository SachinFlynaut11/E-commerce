const express = require('express');
const { validationResult } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { registerValidation, loginValidation } = require('../middleware/validateMiddleware');
const ApiResponse = require('../utils/ApiResponse');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((err) => err.msg).join(', ');
    return res.status(400).json(new ApiResponse(400, message));
  }
  next();
};

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);

module.exports = router;
