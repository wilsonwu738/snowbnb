import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews, getReviews } from "../../store/reviews";
import ReviewsIndexItem from "./ReviewsIndexItem";
import { Link } from "react-router-dom";
import ReviewsSummary from "../ReviewsSummary";


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
    <div className="reviews-list">
      <ul>
        {reviews?.map(review => (
          <ReviewsIndexItem key={review.id} review={review} />
        ))}
      </ul>
      {sessionUser && 
        <Link to={`/listings/${listingId}/newreview`}>Write your own review</Link>
      }
    </div>
  ) 

}

export default ReviewsIndex