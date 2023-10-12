import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';

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
      <h2>{review.reviewerName}</h2>
      <h3>{date}</h3>
      <div>{review.content}</div>

      {sessionUser && sessionUser.id === review.userId && (
        <>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}



    </li>
  )
}

export default ReviewsIndexItem