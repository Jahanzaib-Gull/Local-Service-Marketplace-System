const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Request',
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['accepted', 'completed', 'cancelled'],
      default: 'accepted',
    },
    acceptedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
