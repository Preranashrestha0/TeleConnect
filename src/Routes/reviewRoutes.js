const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addReview, getReviewsByPrescriptionId } = require('../controllers/reviewConntroller');
const router = express.Router();

router.post('/add', authMiddleware, addReview);
router.get('/prescription/:prescriptionId', getReviewsByPrescriptionId);

module.exports = router;
