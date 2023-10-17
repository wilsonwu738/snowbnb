import { Bar } from 'react-chartjs-2';

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

  // Bar chart data
  const chartData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      label: '# of Votes',
      data: [ratingCounts[1], ratingCounts[2], ratingCounts[3], ratingCounts[4], ratingCounts[5]],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };


 
  
  const roundedCommunication = Math.round(averageRatings.communication*100)/100
  const roundedCleanliness = Math.round(averageRatings.cleanliness*100)/100
  const roundedAccuracy = Math.round(averageRatings.accuracy*100)/100
  const roundedLocation = Math.round(averageRatings.location*100)/100
  const roundedValue = Math.round(averageRatings.value*100)/100
  const roundedCheckIn = Math.round(averageRatings.checkIn*100)/100

  



  // return (
  //   <div className="review-summary">
  //     <p>{numReviews} Reviews</p>
  //     <p>Overall average: {roundedOverall}</p>
  //     <p>Communication: {roundedCommunication}</p>
  //     <p>Accuracy: {roundedAccuracy}</p>
  //     <p>Cleanliness: {roundedCleanliness}</p>
  //     <p>Location: {roundedLocation}</p>
  //     <p>Value: {roundedValue}</p>
  //     <p>CheckIn: {roundedCheckIn}</p>
  //   </div>
  // )

  return (
    <div>
      {categories.map(category => (
        <p key={category}>{category}: {averageRatings[category]}</p>
      ))}
      <p>Overall Average: {roundedOverall}</p>
      <Bar data={chartData} options={{scales: {y: {beginAtZero: true}}}} />
    </div>
  );


}

export default ReviewSummary