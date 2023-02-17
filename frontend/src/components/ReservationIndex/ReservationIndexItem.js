import { useSelector } from "react-redux"

//can i use reservation connecting to listings?
const ReservationIndexItem = ({ reservation }) => {
  // const listingUrl = useSelector(state => {
  //   return state.listings[reservation.listingId].photoUrl
  // })
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