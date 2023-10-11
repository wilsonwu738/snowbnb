import React, { useState } from 'react';
import './Ratings.css'

const Ratings = ({ category, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    onRatingChange(category, rate);  // Communicate rating back to the form
  };

  return (
    <div>
      <p>{category}</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          className={star <= rating ? 'filled-star' : 'empty-star'}
        >
          ★  {/* Unicode star character. Alternatively, use an icon library */}
        </button>
      ))}
    </div>
  );
};

export default Ratings