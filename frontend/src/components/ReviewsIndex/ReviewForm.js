import React, { useState, useEffect } from 'react';
import { createReview, updateReview } from '../../store/reviews';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';


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
  console.log('Listing ID:', listingId);
  console.log('Review ID:', reviewId);


  const dispatch = useDispatch();
  const history = useHistory();

  const backToListing = (listingId) => {
    history.push(`/listings/${listingId}`)
  }

  const curReview = useSelector(state => state.reviews[reviewId])
  

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
    if (curReview) {
      console.log("thisis curreview", curReview)
      console.log("thisis before reviewdata", reviewData)

      setReviewData(curReview);
      console.log("this is after reviewdata", reviewData)
    }
  }, [curReview]);


  const handleRatingChange = (categoryKey, rating) => {
    setReviewData((prevData) => ({ ...prevData, [categoryKey]: rating }));
  };

  const handleCommentChange = (event) => {
    setReviewData((prevData) => ({ ...prevData, content: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalReviewData = {review: {...reviewData, listingId: listingId}}
    console.log("final review data:", finalReviewData)
    if (curReview) {
      dispatch(updateReview(listingId, finalReviewData))
    } else {
      dispatch(createReview(listingId, finalReviewData))
    }
    
    backToListing(listingId);
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
        value={reviewData.content}
        onChange={handleCommentChange}
        placeholder="Additional comments..."
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;