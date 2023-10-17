import React, { useState, useEffect } from 'react';
import { createReview, updateReview, fetchReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReviewSuccess from './ReviewSuccess';
import StarRatings from 'react-star-ratings';
import ErrorShow from '../ErrorShow';



const categories = [
  { display: 'Communication', key: 'communication' },
  { display: 'Cleanliness', key: 'cleanliness' },
  { display: 'Accuracy', key: 'accuracy' },
  { display: 'Location', key: 'location' },
  { display: 'Value', key: 'value' },
  { display: 'Check In', key: 'checkIn' },
];

const ReviewForm = () => {

  const { listingId, reviewId } = useParams();
  const dispatch = useDispatch();

  const showReviewSuccess = useSelector(state => state.ui.showReviewSuccess)
  const errorMessges = useSelector(state => state.errors.messages)

  const curReview = useSelector(state => state.entities.reviews[reviewId])
  

  const [reviewData, setReviewData] = useState({
    communication: 0,
    cleanliness: 0,
    accuracy: 0,
    location: 0,
    value: 0,
    checkIn: 0,
    content: '',
  });

  useEffect(() => {
    if (reviewId) {
      if (!curReview) {
        dispatch(fetchReview(listingId, reviewId));
      } else {
        setReviewData(curReview);
      }
    }
  }, [curReview, reviewId, listingId, dispatch]);


  const handleRatingChange = (categoryKey, rating) => {
    setReviewData((prevData) => ({ ...prevData, [categoryKey]: rating }));
  };

  const handleCommentChange = (event) => {
    setReviewData((prevData) => ({ ...prevData, content: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalReviewData = {review: {...reviewData, listingId: listingId}}
    
    if (curReview) {
      dispatch(updateReview(listingId, finalReviewData))
    } else {
      dispatch(createReview(listingId, finalReviewData))
    }
  
  };

  return (
    <>
      {errorMessges && <ErrorShow messages={errorMessges} />}
      <form onSubmit={handleSubmit}>
        {categories.map(({ display, key }) => (
          <div key={key}>
            <p>{display}</p>
            <StarRatings
              rating={reviewData[key]}
              starHoverColor="gold"
              starRatedColor="orange"
              changeRating={(newRating) => handleRatingChange(key, newRating)}
              numberOfStars={5}
              name={key}
            />
          </div>
        ))}
        <textarea
          value={reviewData.content}
          onChange={handleCommentChange}
          placeholder="Additional comments..."
          />
        <button type="submit">Submit Review</button>
      </form>
      {showReviewSuccess && <ReviewSuccess listingId={listingId} />}
    </>
  );
};

export default ReviewForm;