const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} = require('../controllers/requestController');
const { protect, homeOwner } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRequests).post(protect, homeOwner, createRequest);
router
  .route('/:id')
  .get(protect, getRequestById)
  .put(protect, homeOwner, updateRequest)
  .delete(protect, homeOwner, deleteRequest);

module.exports = router;
