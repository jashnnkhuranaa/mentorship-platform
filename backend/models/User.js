const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['junior', 'senior'], required: true },
  bio: { type: String },
  services: [{ name: String, price: Number }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);