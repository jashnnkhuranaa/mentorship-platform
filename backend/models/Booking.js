const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  junior: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senior: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { name: String, price: Number },
  status: { type: String, enum: ['pending', 'paid', 'completed'], default: 'pending' },
  jitsiRoom: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);