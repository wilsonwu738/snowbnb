import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews, getReviews } from "../../store/reviews";
import ReviewsIndexItem from "./ReviewsIndexItem";
import { Link } from "react-router-dom";
import ReviewsSummary from "../ReviewSummary";


const ReviewsIndex = ({ listingId }) => {
  
  const dispatch = useDispatch();
    
  useEffect(() => {

    dispatch(fetchReviews(listingId))

  }, [dispatch, listingId]);

  const reviews = useSelector(getReviews)

  const sessionUser = useSelector(state => state.session.user);

  // if (!reviews?.length) {
    // return <p>No reivews for this listing yet</p>;
  // }

  return (
    <>
      <ReviewsSummary reviews={reviews} />
      <ul className="reviews-list">
        {reviews?.map(review => (
          <ReviewsIndexItem key={review.id} review={review} />
        ))}
      </ul>
      {sessionUser && 
        <Link to={`/listings/${listingId}/newreview`}>Write your own review</Link>
      }
    </>
  ) 

}

export default ReviewsIndex