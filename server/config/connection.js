require('dotenv').config(); // Load .env first
console.log('MONGODB_URI loaded:', process.env.MONGODB_URI); // Now .env is loaded

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;