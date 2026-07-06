const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    stock: {
      type: Number,
      required: true,
      default: 10,
      min: 0,
    },
    rating: {
      type: Number,
      default: 4,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
