const express = require('express');
const router = express.Router();
const { createOffer, getOffersForRequest, acceptOffer } = require('../controllers/offerController');
const { protect, serviceProvider, homeOwner } = require('../middleware/authMiddleware');

router.post('/', protect, serviceProvider, createOffer);
router.get('/request/:id', protect, homeOwner, getOffersForRequest);
router.post('/:id/accept', protect, homeOwner, acceptOffer);

module.exports = router;
