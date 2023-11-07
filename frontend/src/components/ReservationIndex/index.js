import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations, getReservations, deleteReservation } from "../../store/reservations";
import ReservationIndexItem from "./ReservationIndexItem";


const ReservationIndex = () => {
  const dispatch = useDispatch()
  const reservations = useSelector(getReservations)
  const [editingReservationId, setEditingReservationId] = useState(null);
  
  useEffect(() => {
    dispatch(fetchUserReservations())
  }, [dispatch])

  const reservationIndexItems = reservations.map(reservation => <ReservationIndexItem key={reservation.id} reservation={reservation} />)
  
  const handleEditClick = (reservationId) => {
    setEditingReservationId(reservationId);
  };

  const handleCancelClick = () => {
    setEditingReservationId(null);
  };

  const handleSave = (reservationId, startDate, endDate, numGuests) => {
    // Perform the update logic here, such as dispatching an action to update the reservation
    // After the update, cancel the editing mode
    setEditingReservationId(null);

    // Example: dispatch(updateReservationAction({ id: reservationId, startDate, endDate, numGuests }));
    console.log('Updated Reservation:', reservationId, startDate, endDate, numGuests);
  };

  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(reservationId))
  }


  return (
    <div className="reservation-index-container">
      {reservations.map((reservation) => (
        <ReservationIndexItem
          key={reservation.id}
          reservation={reservation}
          isEditing={editingReservationId === reservation.id}
          onSave={handleSave}
          onCancel={handleCancelClick}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )




}



export default ReservationIndex