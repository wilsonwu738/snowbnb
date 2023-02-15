import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, getReservations } from "../../store/reservations";
import ReservationIndexItem from "./ReservationIndexItem";


const ReservationIndex = () => {
  const dispatch = useDispatch()
  const reservations = useSelector(getReservations)
  
  useEffect(() => {
    dispatch(fetchReservations())
  }, [dispatch])

  const reservationIndexItems = reservations.map(reservation => <ReservationIndexItem key={reservation.id} reservation={reservation} />)
  


  return (
    <div className="reservation-container">
      {reservationIndexItems}
    </div>
  )




}



export default ReservationIndex