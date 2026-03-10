const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['plumbing', 'electrical', 'cleaning', 'hvac', 'appliance', 'other'],
    },
    location: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
