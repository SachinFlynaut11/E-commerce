const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      bufferCommands: false,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const { seedProducts } = require('../utils/seedData');
    await seedProducts();
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    console.log('Retrying MongoDB connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
