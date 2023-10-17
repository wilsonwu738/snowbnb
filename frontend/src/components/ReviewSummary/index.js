import { HorizontalBar } from 'react-chartjs-2';

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


  // Bar chart
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

  const categoryIcons = {
    communication: "📞",
    cleanliness: "🧼",
    accuracy: "✔️",
    location: "📍",
    value: "💲",
    checkIn: "🔑",
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ marginRight: '10px' }}>★ {roundedOverall}</h1>
        <span>{numReviews} reviews</span>
      </div>

      <HorizontalBar data={chartData} options={{
        scales: {
          x: {
            display: false, 
            beginAtZero: true
          },
          y: {
            grid: {
              display: false, 
            },
          }
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
          }
        }
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '20px' }}>
        {categories.map(category => (
          <div key={category} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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