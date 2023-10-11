import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews, getReviews } from "../../store/reviews";
import ReviewsIndexItem from "./ReviewsIndexItem";
import { Link } from "react-router-dom";


const ReviewsIndex = ({ listingId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(listingId))

  }, [dispatch, listingId]);

  const reviews = useSelector(getReviews)
  console.log("listing id:", listingId)
  if (!reviews?.length) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="reviews-list">
      <ul>
        {reviews.map(review => (
          <ReviewsIndexItem key={review.id} review={review} />
        ))}
      </ul>
      <Link to={`/listings/${listingId}/newreview`}>Write your own review</Link>
    </div>
  ) 

}

export default ReviewsIndex