const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../utils/ApiResponse');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(new ApiResponse(400, 'Email already registered'));
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json(
      new ApiResponse(201, 'Account created successfully', {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      })
    );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json(new ApiResponse(400, 'Email already registered'));
    }
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json(new ApiResponse(401, 'Invalid email or password'));
    }

    const token = generateToken(user._id);

    res.status(200).json(
      new ApiResponse(200, 'Login successful', {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      })
    );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(
      new ApiResponse(200, 'Profile fetched successfully', {
        _id: user._id,
        name: user.name,
        email: user.email,
      })
    );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

module.exports = { register, login, getMe };
