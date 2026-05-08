const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (HomeOwner)
const createReview = asyncHandler(async (req, res) => {
  const { bookingId, rating, comment } = req.body;

  const booking = await Booking.findById(bookingId).populate('request');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check if booking is completed
  // For now, let's allow reviews for any accepted/completed booking
  // but ideally it should be only for completed ones.

  const existingReview = await Review.findOne({ booking: bookingId });
  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this booking');
  }

  const review = await Review.create({
    booking: bookingId,
    owner: req.user._id,
    provider: booking.provider,
    rating,
    comment,
  });

  // Mark booking and request as completed
  booking.status = 'completed';
  await booking.save();

  if (booking.request) {
    const request = await Request.findById(booking.request._id);
    if (request) {
      request.status = 'completed';
      await request.save();
    }
  }

  res.status(201).json(review);
});

// @desc    Get reviews for a provider
// @route   GET /api/reviews/provider/:id
// @access  Public
const getProviderReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ provider: req.params.id })
    .populate('owner', 'name')
    .sort('-createdAt');

  res.json(reviews);
});

module.exports = {
  createReview,
  getProviderReviews,
};
