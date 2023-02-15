
//can i use reservation connecting to listings?
const ReservationIndexItem = ({ reservation }) => {
  return (
    <div>
      total cost: {reservation.totalCost}
      <br />
      start date: {reservation.startDate}
      <br />
      end date: {reservation.endDate}
      <br />
      <br />
      <br />
    </div>
  )

}

export default ReservationIndexItem