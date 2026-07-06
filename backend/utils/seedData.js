const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    stock: 25,
    rating: 4.5,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Track your fitness, receive notifications, and monitor your health with this sleek smartwatch.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    stock: 18,
    rating: 4.7,
  },
  {
    name: 'Classic Leather Jacket',
    description: 'Genuine leather jacket with a timeless design. Perfect for casual and semi-formal occasions.',
    price: 189.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
    stock: 12,
    rating: 4.3,
  },
  {
    name: 'Running Sneakers',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 89.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    stock: 30,
    rating: 4.6,
  },
  {
    name: 'Minimalist Backpack',
    description: 'Water-resistant backpack with laptop compartment and multiple organizer pockets.',
    price: 59.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    stock: 40,
    rating: 4.4,
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic mugs, microwave and dishwasher safe.',
    price: 34.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca0d?w=500&h=500&fit=crop',
    stock: 50,
    rating: 4.2,
  },
  {
    name: 'Indoor Plant Collection',
    description: 'Set of 3 low-maintenance indoor plants with decorative pots for your living space.',
    price: 45.99,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=500&h=500&fit=crop',
    stock: 15,
    rating: 4.8,
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip eco-friendly yoga mat with carrying strap. 6mm thick for extra comfort.',
    price: 39.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    stock: 35,
    rating: 4.5,
  },
  {
    name: 'Dumbbell Set 20kg',
    description: 'Adjustable dumbbell set for home workouts. Durable coating with comfortable grip.',
    price: 79.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=500&fit=crop',
    stock: 20,
    rating: 4.1,
  },
  {
    name: 'Polarized Sunglasses',
    description: 'UV400 protection sunglasses with polarized lenses and lightweight metal frame.',
    price: 49.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196233-8f11f4357e82?w=500&h=500&fit=crop',
    stock: 28,
    rating: 4.0,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches for gaming and typing.',
    price: 119.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467593992-6a14da3d0795?w=500&h=500&fit=crop',
    stock: 22,
    rating: 4.6,
  },
  {
    name: 'Cotton T-Shirt Pack',
    description: 'Pack of 3 premium cotton t-shirts in assorted colors. Soft, breathable fabric.',
    price: 29.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    stock: 60,
    rating: 4.3,
  },
];

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(sampleProducts);
      console.log('Sample products seeded successfully');
    }
  } catch (error) {
    console.error('Seed error:', error.message);
  }
};

module.exports = { seedProducts, sampleProducts };
