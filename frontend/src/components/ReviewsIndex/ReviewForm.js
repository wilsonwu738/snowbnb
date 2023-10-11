import React, { useState } from 'react';
import { createReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';

const categories = [
  { display: 'Communication', key: 'communication' },
  { display: 'Cleanliness', key: 'cleanliness' },
  { display: 'Accuracy', key: 'accuracy' },
  { display: 'Location', key: 'location' },
  { display: 'Value', key: 'value' },
  { display: 'Check In', key: 'check_in' },
];

const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({
    communication: 0,
    cleanliness: 0,
    accuracy: 0,
    location: 0,
    value: 0,
    check_in: 0,
    comment: '',
  });

  const handleRatingChange = (categoryKey, rating) => {
    setReviewData((prevData) => ({ ...prevData, [categoryKey]: rating }));
  };

  const handleCommentChange = (event) => {
    setReviewData((prevData) => ({ ...prevData, comment: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit reviewData to API
  };

  return (
    <form onSubmit={handleSubmit}>
      {categories.map(({ display, key }) => (
        <div key={key}>
          <p>{display}</p>
          <StarRatingComponent 
            name={key} 
            starCount={5}
            value={reviewData[key]}
            onStarClick={(nextValue) => handleRatingChange(key, nextValue)}
          />
        </div>
      ))}
      <textarea
        value={reviewData.comment}
        onChange={handleCommentChange}
        placeholder="Additional comments..."
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;