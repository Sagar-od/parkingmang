const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plateNumber: { type: String, required: true, unique: true },
  vehicleType: { type: String, enum: ['Permanent', 'Temporary'], required: true },
  slotNumber: { type: Number, required: true, min: 1, max: 200, unique: true },
  paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Paid' },
  lastPaymentDate: { type: Date, default: Date.now },
  paidUntil: { type: Date, default: () => new Date(Date.now() + 30*24*60*60*1000) },
  notifications: [{
    message: String,
    date: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
