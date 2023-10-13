import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews, getReviews } from "../../store/reviews";
import ReviewsIndexItem from "./ReviewsIndexItem";
import { Link } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import ReviewsSummary from "../ReviewsSummary";


const ReviewsIndex = ({ listingId }) => {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  
  useEffect(() => {
    dispatch(fetchReviews(listingId))

  }, [dispatch, listingId]);

  const reviews = useSelector(getReviews)
  const sessionUser = useSelector(state => state.session.user);

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
      {sessionUser ? (
        <Link to={`/listings/${listingId}/newreview`}>Write your own review</Link>
      ) : (
        <>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowLogin(true); }}>
                Write your own review
          </a>
          {showLogin && <LoginFormModal onClose={() => setShowLogin(false)} />}
        </>  
      )}
    </div>
  ) 

}

export default ReviewsIndex