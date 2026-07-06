require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { checkDBConnection } = require('./middleware/dbMiddleware');
const ApiResponse = require('./utils/ApiResponse');

connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json(new ApiResponse(200, 'API is running'));
});

app.use('/api/auth', checkDBConnection, authRoutes);
app.use('/api/products', checkDBConnection, productRoutes);
app.use('/api/cart', checkDBConnection, cartRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
