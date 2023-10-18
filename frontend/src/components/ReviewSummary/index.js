import React from 'react';
import './ReviewSummary.css';

const ReviewSummary = ( { reviews }) => {

  const categories = [
    'communication',
    'cleanliness',
    'accuracy',
    'location',
    'value',
    'checkIn',
  ];

  const totalRatings = {};
  const numReviews = Object.keys(reviews).length;
  categories.forEach(category => totalRatings[category] = 0);

  const ratingCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };

  for (const reviewId in reviews) {
    const review = reviews[reviewId];
    categories.forEach(category => totalRatings[category] += review[category]);
    const averageRatingForReview = categories.reduce((sum, cat) => sum + review[cat], 0) / categories.length;
    const roundedRating = Math.round(averageRatingForReview);
    ratingCounts[roundedRating]++;
  }

  const averageRatings = {};

  categories.forEach(category => {
    averageRatings[category] = Math.round((totalRatings[category] / numReviews) * 10) / 10; // Rounded to 1 decimal place
  });

  const overallAverage = categories.reduce((sum, category) => sum + averageRatings[category], 0) / categories.length;
  const roundedOverall= Math.round(overallAverage * 100)/100




  const categoryIcons = {
    communication: "📞",
    cleanliness: "🧼",
    accuracy: "✔️",
    location: "📍",
    value: "💲",
    checkIn: "🔑",
  };



  return (
    <div className="review-summary">
      <div className="header">
        <h1>★ {roundedOverall}</h1>
        <span>{numReviews} reviews</span>
      </div>

      <div className="rating-bars">
        {Object.keys(ratingCounts).sort().reverse().map(rating => (
            <div key={rating} className="rating-bar">
                <div 
                    className={`rating-fill rating-${rating}`} 
                    style={{width: `${(ratingCounts[rating] / numReviews) * 100}%`}}
                ></div>
            </div>
        ))}
      </div>



      <div className='categories'>
        {categories.map(category => (
          <div>
            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <span>{averageRatings[category]}</span>
            <span>{categoryIcons[category]}</span>
          </div>
        ))}
      </div>
    </div>
  );


}

export default ReviewSummary