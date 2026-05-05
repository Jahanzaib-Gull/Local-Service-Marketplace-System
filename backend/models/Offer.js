const mongoose = require('mongoose');

const offerSchema = mongoose.Schema(
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
    price: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
