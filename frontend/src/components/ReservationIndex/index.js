import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations, getReservations } from "../../store/reservations";
import ReservationIndexItem from "./ReservationIndexItem";


const ReservationIndex = () => {
  const dispatch = useDispatch()
  const reservations = useSelector(getReservations)
  
  useEffect(() => {
    dispatch(fetchUserReservations())
  }, [dispatch])

  const reservationIndexItems = reservations.map(reservation => <ReservationIndexItem key={reservation.id} reservation={reservation} />)
  


  return (
    <div className="reservation-index-container">
      {reservationIndexItems}
    </div>
  )




}



export default ReservationIndex