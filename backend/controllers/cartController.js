const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ApiResponse = require('../utils/ApiResponse');

const populateCart = (query) =>
  query.populate({
    path: 'items.product',
    model: 'Product',
  });

const calculateTotal = (items) =>
  items.reduce((total, item) => {
    if (item.product) {
      return total + item.product.price * item.quantity;
    }
    return total;
  }, 0);

const formatCartResponse = (cart) => {
  const totalPrice = calculateTotal(cart.items);
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    _id: cart._id,
    sessionId: cart.sessionId,
    items: cart.items,
    totalPrice: Number(totalPrice.toFixed(2)),
    totalItems,
  };
};

const getOrCreateCart = async (sessionId) => {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = await Cart.create({ sessionId, items: [] });
  }
  return cart;
};

const getCart = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const cart = await getOrCreateCart(sessionId);
    const populatedCart = await populateCart(Cart.findById(cart._id));

    res.status(200).json(new ApiResponse(200, 'Cart fetched successfully', formatCartResponse(populatedCart)));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const addToCart = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json(new ApiResponse(400, 'Product ID is required'));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json(new ApiResponse(404, 'Product not found'));
    }

    if (product.stock < quantity) {
      return res.status(400).json(new ApiResponse(400, 'Insufficient stock'));
    }

    const cart = await getOrCreateCart(sessionId);
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      const newQty = existingItem.quantity + quantity;
      if (product.stock < newQty) {
        return res.status(400).json(new ApiResponse(400, 'Insufficient stock'));
      }
      existingItem.quantity = newQty;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const populatedCart = await populateCart(Cart.findById(cart._id));

    res.status(200).json(new ApiResponse(200, 'Item added to cart', formatCartResponse(populatedCart)));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { sessionId, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json(new ApiResponse(400, 'Quantity must be at least 1'));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json(new ApiResponse(404, 'Product not found'));
    }

    if (product.stock < quantity) {
      return res.status(400).json(new ApiResponse(400, 'Insufficient stock'));
    }

    const cart = await getOrCreateCart(sessionId);
    const item = cart.items.find((i) => i.product.toString() === productId);

    if (!item) {
      return res.status(404).json(new ApiResponse(404, 'Item not found in cart'));
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await populateCart(Cart.findById(cart._id));
    res.status(200).json(new ApiResponse(200, 'Cart updated successfully', formatCartResponse(populatedCart)));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { sessionId, productId } = req.params;
    const cart = await getOrCreateCart(sessionId);

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json(new ApiResponse(404, 'Item not found in cart'));
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    const populatedCart = await populateCart(Cart.findById(cart._id));
    res.status(200).json(new ApiResponse(200, 'Item removed from cart', formatCartResponse(populatedCart)));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

const clearCart = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const cart = await getOrCreateCart(sessionId);
    cart.items = [];
    await cart.save();

    res.status(200).json(new ApiResponse(200, 'Cart cleared', formatCartResponse(cart)));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message));
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
