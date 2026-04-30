const asyncHandler = require('express-async-handler');
const Request = require('../models/Request');

// @desc    Create new service request
// @route   POST /api/requests
// @access  Private (HomeOwner)
const createRequest = asyncHandler(async (req, res) => {
  const { title, description, category, location, budget } = req.body;

  const request = await Request.create({
    title,
    description,
    category,
    location,
    budget,
    createdBy: req.user._id,
  });

  res.status(201).json(request);
});

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private
const getRequests = asyncHandler(async (req, res) => {
  // If homeowner, get only their requests. If provider, get all pending requests.
  let filter = {};
  if (req.user.role === 'owner') {
    filter = { createdBy: req.user._id };
  } else if (req.user.role === 'provider') {
    filter = { status: 'pending' };
  }

  const requests = await Request.find(filter).populate('createdBy', 'name email').sort('-createdAt');
  res.json(requests);
});

// @desc    Get request by ID
// @route   GET /api/requests/:id
// @access  Private
const getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id).populate('createdBy', 'name email phone');

  if (request) {
    res.json(request);
  } else {
    res.status(404);
    throw new Error('Request not found');
  }
});

// @desc    Update a request
// @route   PUT /api/requests/:id
// @access  Private (HomeOwner)
const updateRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request) {
    if (request.createdBy.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this request');
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedRequest);
  } else {
    res.status(404);
    throw new Error('Request not found');
  }
});

// @desc    Delete a request
// @route   DELETE /api/requests/:id
// @access  Private (HomeOwner)
const deleteRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);

  if (request) {
    if (request.createdBy.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this request');
    }

    await request.deleteOne();
    res.json({ message: 'Request removed' });
  } else {
    res.status(404);
    throw new Error('Request not found');
  }
});

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
