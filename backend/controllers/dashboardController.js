const asyncHandler = require('express-async-handler');
const Request = require('../models/Request');
const Booking = require('../models/Booking');

// @desc    Get dashboard metrics
// @route   GET /api/dashboard/metrics
// @access  Private
const getDashboardMetrics = asyncHandler(async (req, res) => {
  let metrics = {};

  if (req.user.role === 'HomeOwner') {
    const totalRequests = await Request.countDocuments({ createdBy: req.user._id });
    const activeRequests = await Request.countDocuments({ createdBy: req.user._id, status: 'active' });
    const completedRequests = await Request.countDocuments({ createdBy: req.user._id, status: 'completed' });
    
    // Get recent requests
    const recentRequests = await Request.find({ createdBy: req.user._id })
      .sort('-createdAt')
      .limit(5);

    metrics = {
      totalRequests,
      activeJobs: activeRequests,
      completedJobs: completedRequests,
      recentRequests,
    };
  } else if (req.user.role === 'ServiceProvider') {
    // Provider metrics
    const availableJobs = await Request.countDocuments({ status: 'pending' });
    
    const activeBookings = await Booking.countDocuments({ provider: req.user._id, status: 'accepted' });
    const completedBookings = await Booking.countDocuments({ provider: req.user._id, status: 'completed' });
    
    const recentJobs = await Request.find({ status: 'pending' })
      .sort('-createdAt')
      .limit(5);

    // Bookings representing recent active jobs for provider
    const myRecentJobs = await Booking.find({ provider: req.user._id })
      .populate('request')
      .sort('-acceptedAt')
      .limit(5);

    metrics = {
      availableJobs,
      activeJobs: activeBookings,
      completedJobs: completedBookings,
      recentJobs, // overall fresh requests
      myRecentJobs // jobs this provider accepted
    };
  }

  res.json(metrics);
});

module.exports = { getDashboardMetrics };
