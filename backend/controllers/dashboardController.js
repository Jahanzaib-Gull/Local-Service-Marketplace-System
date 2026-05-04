const asyncHandler = require('express-async-handler');
const Request = require('../models/Request');
const Booking = require('../models/Booking');

// @desc    Get dashboard metrics
// @route   GET /api/dashboard/metrics
// @access  Private
const getDashboardMetrics = asyncHandler(async (req, res) => {
  if (req.user.role === 'owner') {
    const totalRequests = await Request.countDocuments({ createdBy: req.user._id });
    const activeJobs = await Request.countDocuments({ createdBy: req.user._id, status: 'accepted' });
    const completedJobs = await Request.countDocuments({ createdBy: req.user._id, status: 'completed' });
    const recentRequests = await Request.find({ createdBy: req.user._id })
      .sort('-createdAt')
      .limit(5);

    return res.json({
      role: 'owner',
      stats: { totalRequests, activeJobs, completedJobs },
      recentRequests,
    });
  } else if (req.user.role === 'provider') {
    // Provider metrics
    const availableJobs = await Request.countDocuments({ status: 'pending' });
    const activeJobs = await Booking.countDocuments({ provider: req.user._id, status: 'accepted' });
    const completedJobs = await Booking.countDocuments({ provider: req.user._id, status: 'completed' });
    
    // recent available jobs
    const recentJobs = await Request.find({ status: 'pending' })
      .sort('-createdAt')
      .limit(5);

    // Bookings representing recent active jobs for provider
    const myRecentJobs = await Booking.find({ provider: req.user._id })
      .populate('request')
      .sort('-acceptedAt')
      .limit(5);

    return res.json({
      role: 'provider',
      stats: { 
        availableJobs: availableJobs || 0, 
        activeJobs: activeJobs || 0, 
        completedJobs: completedJobs || 0 
      },
      recentJobs: recentJobs || [], 
      myRecentJobs: myRecentJobs || []
    });
  }

  res.status(400).json({ message: 'Invalid role' });
});

module.exports = { getDashboardMetrics };
