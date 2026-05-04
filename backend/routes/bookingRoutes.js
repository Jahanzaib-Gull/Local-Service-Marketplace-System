const express = require('express');
const router = express.Router();
const {
  acceptRequest,
  getProviderBookings,
  getUserBookings,
} = require('../controllers/bookingController');
const { protect, serviceProvider, homeOwner } = require('../middleware/authMiddleware');

router.post('/accept', protect, serviceProvider, acceptRequest);
router.get('/provider', protect, serviceProvider, getProviderBookings);
router.get('/user', protect, homeOwner, getUserBookings);

module.exports = router;
