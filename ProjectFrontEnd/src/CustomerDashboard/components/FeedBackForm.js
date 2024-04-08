// FeedbackFormPage.js

import React, { useState } from 'react';
import CustomRating from './CustomRating'; // Importing CustomRating component from its file

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send feedback to server)
    console.log({ feedback, rating });
    // Reset form fields
    setFeedback('');
    setRating(0);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center">Leave Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="feedback" className="block text-gray-700 font-semibold mb-2">Feedback</label>
          <textarea
            id="feedback"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Rate the Product</label>
          <CustomRating rating={rating} setRating={setRating} />
        </div>

        <button
          type="submit"
          className="w-full bg-[rgba(110,89,75,1)] text-white py-3 px-4 rounded-lg hover:bg-[rgba(110,89,75,0.5)] transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
