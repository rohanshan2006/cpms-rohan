const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed database with demo data if it doesn't exist
    const seedData = require('./seed');
    await seedData();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;