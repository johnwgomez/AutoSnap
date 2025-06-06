// server/models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  // Make color optional (or remove entirely if you never use it)
  color: {
    type: String,
    default: '', 
  },
  // New fields: price and description (both required in this schema)
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',  // if no image is provided, leave as empty string
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // (If you want to add an image later, you can add image: { type: String, default: '' } )
});

module.exports = mongoose.model('Car', carSchema);
