const asyncHandler = require('express-async-handler');
const Offer = require('../models/Offer');
const Request = require('../models/Request');
const Booking = require('../models/Booking');

// @desc    Create an offer for a request
// @route   POST /api/offers
// @access  Private (ServiceProvider)
const createOffer = asyncHandler(async (req, res) => {
  const { requestId, price, message } = req.body;

  const request = await Request.findById(requestId);
  if (!request) {
    res.status(404);
    throw new Error('Request not found');
  }

  if (request.status !== 'pending') {
    res.status(400);
    throw new Error('Request is no longer accepting offers');
  }

  const existingOffer = await Offer.findOne({ request: requestId, provider: req.user._id });
  if (existingOffer) {
    res.status(400);
    throw new Error('You have already sent an offer for this request');
  }

  const offer = await Offer.create({
    request: requestId,
    provider: req.user._id,
    price,
    message,
  });

  res.status(201).json(offer);
});

// @desc    Get offers for a specific request
// @route   GET /api/offers/request/:id
// @access  Private (HomeOwner)
const getOffersForRequest = asyncHandler(async (req, res) => {
  const offers = await Offer.find({ request: req.params.id })
    .populate('provider', 'name email phone location')
    .sort('-createdAt');

  res.json(offers);
});

// @desc    Accept an offer
// @route   POST /api/offers/:id/accept
// @access  Private (HomeOwner)
const acceptOffer = asyncHandler(async (req, res) => {
  const offer = await Offer.findById(req.params.id).populate('request');

  if (!offer) {
    res.status(404);
    throw new Error('Offer not found');
  }

  const request = offer.request;

  if (request.status !== 'pending') {
    res.status(400);
    throw new Error('Request is already active or completed');
  }

  // Update offer status
  offer.status = 'accepted';
  await offer.save();

  // Reject all other offers for this request
  await Offer.updateMany(
    { request: request._id, _id: { $ne: offer._id } },
    { status: 'rejected' }
  );

  // Update request status
  request.status = 'active';
  await request.save();

  // Create booking
  const booking = await Booking.create({
    request: request._id,
    provider: offer.provider,
    offer: offer._id,
    status: 'accepted',
  });

  res.json({ message: 'Offer accepted', booking });
});

module.exports = {
  createOffer,
  getOffersForRequest,
  acceptOffer,
};
