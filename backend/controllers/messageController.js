const asyncHandler = require('express-async-handler');
const Message = require('../models/Message');
const Booking = require('../models/Booking');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { bookingId, content } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check if user is part of the booking
  const request = await require('../models/Request').findById(booking.request);
  if (booking.provider.toString() !== req.user._id.toString() && request.createdBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to chat in this booking');
  }

  const message = await Message.create({
    booking: bookingId,
    sender: req.user._id,
    content,
  });

  res.status(201).json(message);
});

// @desc    Get messages for a booking
// @route   GET /api/messages/booking/:id
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ booking: req.params.id })
    .populate('sender', 'name')
    .sort('createdAt');

  res.json(messages);
});

module.exports = {
  sendMessage,
  getMessages,
};
