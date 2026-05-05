const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Request = require('../models/Request');

// @desc    Accept a request
// @route   POST /api/bookings/accept
// @access  Private (ServiceProvider)
const acceptRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.body;

  const request = await Request.findById(requestId);

  if (!request) {
    res.status(404);
    throw new Error('Request not found');
  }

  if (request.status !== 'pending') {
    res.status(400);
    throw new Error(`Request is no longer available (Current status: ${request.status})`);
  }

  // Check if this provider already accepted this request
  const existingBooking = await Booking.findOne({ request: requestId, provider: req.user._id });
  if (existingBooking) {
    res.status(400);
    throw new Error('You have already accepted this request');
  }

  // Create booking
  const booking = await Booking.create({
    request: requestId,
    provider: req.user._id,
    status: 'accepted',
  });

  // Update request status
  request.status = 'active';
  await request.save();

  res.status(201).json(booking);
});

// @desc    Get provider bookings
// @route   GET /api/bookings/provider
// @access  Private (ServiceProvider)
const getProviderBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ provider: req.user._id })
    .populate('request')
    .sort('-acceptedAt');

  res.json(bookings);
});

// @desc    Get user bookings
// @route   GET /api/bookings/user
// @access  Private (HomeOwner)
const getUserBookings = asyncHandler(async (req, res) => {
  // Find all requests belonging to user, then find bookings for those requests
  const userRequests = await Request.find({ createdBy: req.user._id }).select('_id');
  const requestIds = userRequests.map((req) => req._id);

  const bookings = await Booking.find({ request: { $in: requestIds } })
    .populate('request')
    .populate('provider', 'name email phone')
    .sort('-acceptedAt');

  res.json(bookings);
});

module.exports = {
  acceptRequest,
  getProviderBookings,
  getUserBookings,
};
