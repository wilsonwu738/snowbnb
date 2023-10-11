import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews, getReviews } from "../../store/reviews";
import ReviewsIndexItem from "./ReviewsIndexItem";


const ReviewsIndex = ({ listingId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(listingId))
    console.log("hit dispatch")
  }, [dispatch, listingId]);

  const reviews = useSelector(getReviews)
  console.log(reviews)
  if (!reviews.length) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="reviews-list">
      <ul>
        {reviews.map(review => (
          <ReviewsIndexItem key={review.id} review={review} />
        ))}
      </ul>

    </div>
  ) 

}

export default ReviewsIndex