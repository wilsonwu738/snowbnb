import React, { useState, useEffect } from 'react';
import { createReview, updateReview, fetchReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReviewSuccess from './ReviewSuccess';
import StarRatings from 'react-star-ratings';
import ErrorShow from '../ErrorShow';
import './ReviewForm.css'



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
  // const errorMessges = useSelector(state => state.errors.messages)

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

  const hasZeroValue = () => {
    for (let category in reviewData) {
      // Skip checking the 'content' key
      if (category !== 'content' && reviewData[category] === 0) {
        return true;
      }
    }
    return false;
  };
  

  const handleSubmit = (event) => {
    //prevent the rerender of the page
    event.preventDefault();

    if (hasZeroValue()) {
      alert('Please ensure all categories are rated.'); 
      return;
    }

    const finalReviewData = {review: {...reviewData, listingId: listingId}}
    
    if (curReview) {
      dispatch(updateReview(listingId, finalReviewData))
    } else {
      dispatch(createReview(listingId, finalReviewData))
    }
  
  };

  return (
    <div className='review-form-container'>
      {/* {errorMessges && <ErrorShow messages={errorMessges} />} */}
      <form onSubmit={handleSubmit}>
        {categories.map(({ display, key }) => (
          <div className='review-form-rating' key={key}>
            <p className='display-category'>{display}</p>
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
          className='review-content-box'
          value={reviewData.content}
          onChange={handleCommentChange}
          placeholder="Additional comments..."
          required
          />
        <button className='review-form-button' type="submit">Post Review</button>
      </form>
      {showReviewSuccess && <ReviewSuccess listingId={listingId} />}
    </div>
  );
};

export default ReviewForm;