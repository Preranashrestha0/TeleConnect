// components/ReviewForm.js
import React, { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const ReviewForm = ({ prescriptionId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/reviews/add', {
        prescriptionId,
        reviewText,
        rating
      });
      toast.success('Review added successfully');
      setReviewText('');
      setRating(1);
    } catch (error) {
      console.error('Error adding review', error);
      toast.error('Error adding review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Add Review</h2>

      <label className="block mb-4">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Review:
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md"
          rows="4"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
