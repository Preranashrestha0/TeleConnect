const Prescription = require('../models/Prescription');
const Review = require('../models/reviewsModel');

const addReview = async (req, res) => {
  try {
    const { prescriptionId, review } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Validate that the prescription exists
    const prescription = await Prescription.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    const newReview = new Review({ prescriptionId, userId, review });
    await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getReviewsByPrescriptionId = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const reviews = await Review.find({ prescriptionId }).populate('userId', 'firstName lastName');
    
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addReview,
  getReviewsByPrescriptionId
};
