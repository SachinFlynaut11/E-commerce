const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

const router = express.Router();

router.get('/:sessionId', getCart);
router.post('/:sessionId/items', addToCart);
router.patch('/:sessionId/items/:productId', updateCartItem);
router.delete('/:sessionId/items/:productId', removeFromCart);
router.delete('/:sessionId', clearCart);

module.exports = router;
