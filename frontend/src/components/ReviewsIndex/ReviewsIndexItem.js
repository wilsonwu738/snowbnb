import moment from 'moment'

const ReviewsIndexItem = ({ review }) => {
  const date = moment(review.reviewDate).format('MMMM YYYY');
  
  return (
    <li className='individual-review'>
      <h2>{review.reviewerName}</h2>
      <h3>{date}</h3>
      <div>{review.content}</div>

    </li>
  )
}

export default ReviewsIndexItem