const Product = require('../models/Product');
const ApiResponse = require('../utils/ApiResponse');
const { seedProducts: runSeed } = require('../utils/seedData');

const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, 'Products fetched successfully', products));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json(new ApiResponse(404, 'Product not found'));
    }

    res.status(200).json(new ApiResponse(200, 'Product fetched successfully', product));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.status(200).json(new ApiResponse(200, 'Categories fetched successfully', categories));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const seedProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.status(200).json(new ApiResponse(200, 'Products already seeded', { count }));
    }

    await runSeed();
    const newCount = await Product.countDocuments();
    res.status(201).json(new ApiResponse(201, 'Products seeded successfully', { count: newCount }));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  seedProducts,
};
