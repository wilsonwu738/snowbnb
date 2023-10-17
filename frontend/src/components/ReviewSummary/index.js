

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
  for (const reviewId in reviews) {
    const review = reviews[reviewId];
    categories.forEach(category => totalRatings[category] += review[category]);
  }

  const averageRatings = {};
  categories.forEach(category => averageRatings[category] = totalRatings[category] / numReviews);
  const overallAverage = categories.reduce((sum, category) => sum + averageRatings[category], 0) / categories.length;
  const roundedOverall= Math.round(overallAverage * 100)/100
 
  
  const roundedCommunication = Math.round(averageRatings.communication*100)/100
  const roundedCleanliness = Math.round(averageRatings.cleanliness*100)/100
  const roundedAccuracy = Math.round(averageRatings.accuracy*100)/100
  const roundedLocation = Math.round(averageRatings.location*100)/100
  const roundedValue = Math.round(averageRatings.value*100)/100
  const roundedCheckIn = Math.round(averageRatings.checkIn*100)/100

  



  return (
    <div className="review-summary">
      <p>{numReviews} Reviews</p>
      <p>Overall average: {roundedOverall}</p>
      <p>Communication: {roundedCommunication}</p>
      <p>Accuracy: {roundedAccuracy}</p>
      <p>Cleanliness: {roundedCleanliness}</p>
      <p>Location: {roundedLocation}</p>
      <p>Value: {roundedValue}</p>
      <p>CheckIn: {roundedCheckIn}</p>
    </div>
  )


}

export default ReviewSummary