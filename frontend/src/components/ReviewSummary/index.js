import React from 'react';
import './ReviewSummary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faPumpSoap, faKey, faLocationDot, faTag } from '@fortawesome/free-solid-svg-icons';


const ReviewSummary = ({ reviews, listing }) => {

  const categories = [
    'communication',
    'cleanliness',
    'accuracy',
    'location',
    'value',
    'checkIn',
  ];

  const totalRatings = {
    'communication': 0,
    'cleanliness': 0,
    'accuracy': 0,
    'location': 0,
    'value': 0,
    'checkIn':0
  };
  
  
  const ratingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  
  const numReviews = Object.keys(reviews).length;

  const categoryIcons = {
    communication: <FontAwesomeIcon icon={faMessage} />,
    cleanliness: <FontAwesomeIcon icon={faPumpSoap} />,
    accuracy: <FontAwesomeIcon icon={faCircleCheck} />,
    location: <FontAwesomeIcon icon={faLocationDot} />,
    value: <FontAwesomeIcon icon={faTag} />,
    checkIn: <FontAwesomeIcon icon={faKey} />,
  };

  let totalRating = 0;
  
  //looping through each review after turning it to an array, preping the totalRatings object and ratingCounts object
  Object.values(reviews).forEach(review => {
    //adding up the total rating for each category
    categories.forEach(category => totalRatings[category] += review[category] || 0);
    const roundedRating = Math.round(review.rating);
    ratingCounts[roundedRating]++;

    totalRating += review.rating;
  });

  
  let roundedOverall = numReviews !== 0 ? Math.round(totalRating / numReviews * 100) /100 : 0;

  const averageRatings = {};
  //numReviews could be 0 when the fetcReviews not complete yet, and dividing 0 cause the NaN issue
  if (numReviews > 0) {
    categories.forEach(category => {
      averageRatings[category] = Math.round((totalRatings[category] / numReviews) * 10) / 10;
    });
  }
 
  

  //cmd+ctrl+sce for •

  return (
    <div className="review-summary-container">
      <div className="review-summary-header">
        <h1 className='review-summary-rating'>★ {roundedOverall} </h1>
        <span>•</span>
        <span className='review-summary-numReviews'>{numReviews} reviews</span>
      </div>

      <div className='review-summary-content'>

        <div className="rating-bars">
          <div className='rating-text'>Overall rating</div>
          {Object.keys(ratingCounts).sort().reverse().map(rating => (
            <div key={rating} className="rating-bar">
                  <span className="rating-number">{rating}</span>
                  <div className="rating-fill-background">
                  <div className={`rating-fill rating-${rating}`} 
                       style={{width: numReviews !== 0 ? `${(ratingCounts[rating] / numReviews) * 100}%` : '0%'}}
                       ></div>
              </div>
              </div>
          ))}
        </div>

        <div className='review-categories'>
          {categories.map(category => (
            <div className='review-category' key={category}>
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              <span>{averageRatings[category] || 0}</span>
              <span>{categoryIcons[category]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


}

export default ReviewSummary