const express = require('express');
const {
  getProducts,
  getProductById,
  getCategories,
  seedProducts,
} = require('../controllers/productController');

const router = express.Router();

router.get('/categories', getCategories);
router.post('/seed', seedProducts);
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
