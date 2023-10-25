import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import './ReviewsIndexItem.css'

const ReviewsIndexItem = ({ review }) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();


  const date = moment(review.reviewDate).format('MMMM YYYY');

  const handleUpdate = () => {
    history.push(`/listings/${review.listingId}/reviews/${review.id}/edit`)
  }

  const handleDelete = () => {
    dispatch(deleteReview(review.listingId, review.id))
  }
  
  return (
    <li className='individual-review'>
      <h2 className='reviewer-name'>{review.reviewerName}</h2>
      <h3 className='review-date'>{date}</h3>
      <br />
      <div className='review-content'>{review.content}</div>

      {sessionUser && sessionUser.id === review.userId && (
        <div className='review-buttons'>
          <button className='review-update' onClick={handleUpdate}>Update</button>
          <button className='review-delete' onClick={handleDelete}>X</button>
        </div>
      )}



    </li>
  )
}

export default ReviewsIndexItem