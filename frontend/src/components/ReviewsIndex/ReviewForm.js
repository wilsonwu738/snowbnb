import React, { useState } from 'react';
import Ratings from './Ratings';
import { createReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const categories = ['Communication', 'Cleanliness', 'Value'];

const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({
    Communication: 0,
    Cleanliness: 0,
    Value: 0,
    comment: '',
  });
  const dispatch = useDispatch();
  const { listingId } = useParams();
  

  const handleRatingChange = (category, rating) => {
    setReviewData((prevData) => ({ ...prevData, [category]: rating }));
  };

  const handleCommentChange = (event) => {
    setReviewData((prevData) => ({ ...prevData, comment: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalData = {reviewData}
    dispatch(createReview(listingId, reviewData))
  
  };

  return (
    <form onSubmit={handleSubmit}>
      {categories.map((category) => (
        <Ratings
          key={category}
          category={category}
          onRatingChange={handleRatingChange}
        />
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

export default ReviewForm