import { useDispatch, useSelector } from "react-redux"
import ReviewsIndexItem from "./ReviewsIndexItem";
import ReviewsSummary from "../ReviewSummary";
import "./ReviewsIndexItem.css";
import { useHistory } from "react-router-dom";
import { toggleLogin } from "../../store/ui";
import './ReviewsIndex.css'
import { getListing } from "../../store/listings";


const ReviewsIndex = ({ listingId, reviews }) => {

  const sessionUser = useSelector(state => state.session.user);
  const listing = useSelector(getListing(listingId));
  const history = useHistory();
  const dispatch = useDispatch();

  const handleWriteReview = () => {
    if (!sessionUser) {
      dispatch(toggleLogin());
    } else {
      if (sessionUser.reservedListingId.includes(parseInt(listingId))) {
        history.push(`/listings/${listingId}/newreview`) 
        } else {
          alert("You do not have a reservation with this listing")
        }
      }
  }
  

  if (!reviews?.length) {
    return <div className="no-reviews">No reivews (yet)</div>;
  }

  return (
    <>
      <ReviewsSummary reviews={reviews} listing={listing}/>
      <ul className="reviews-list">
        {reviews?.map(review => (
          <ReviewsIndexItem key={review.id} review={review} />
        ))}
      </ul>
      <div className="review-create">
        <button className="review-create-button" onClick={handleWriteReview}>Write your own review</button>
      </div>
    </>
  ) 

}

export default ReviewsIndex