const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  prescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  review: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
