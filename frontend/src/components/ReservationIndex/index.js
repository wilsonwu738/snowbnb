import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserReservations, getReservations, updateReservation, deleteReservation } from "../../store/reservations";
import ReservationIndexItem from "./ReservationIndexItem";
import './ReservationIndex.css'
import { useHistory } from "react-router-dom";

const ReservationIndex = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(getReservations);
  const [editingReservationId, setEditingReservationId] = useState(null);
  const history = useHistory();
  
  useEffect(() => {
    dispatch(fetchUserReservations())
  }, [dispatch])

  const upcomingReservations = reservations.filter(reservation => new Date(reservation.startDate) > new Date());
  const pastReservations = reservations.filter(reservation => new Date(reservation.endDate) < new Date());
  
  const handleEditClick = (reservationId) => {
    setEditingReservationId(reservationId);
  };

  const handleCancelClick = () => {
    setEditingReservationId(null);
  };

  const handleSave = (reservationId, startDate, endDate, numGuests, totalCost) => {
    // Perform the update logic here, such as dispatching an action to update the reservation
    // After the update, cancel the editing mode
    const reservation = {
      id: reservationId,
      startDate: startDate,
      endDate: endDate,
      numGuests, numGuests,
      totalCost: totalCost
    }
    dispatch(updateReservation(reservation))
    setEditingReservationId(null);

  };

  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(reservationId))
  }


  return (
    <div className="reservation-index-container">
      {upcomingReservations.length > 0 && (
        <>
          <h2 className="trips-upcoming">Upcoming Trips</h2>
          {upcomingReservations.map((reservation) => (
            <ReservationIndexItem
              key={reservation.id}
              reservation={reservation}
              isEditing={editingReservationId === reservation.id}
              onSave={handleSave}
              onCancel={handleCancelClick}
              onEdit={handleEditClick}
              onDelete={handleDelete}
              upcoming={true}
            />
          ))}
        </>
      )}

      {pastReservations.length > 0 && (
        <>
          <h2 className="trips-past">Past Trips</h2>
          {pastReservations.map((reservation) => (
            <ReservationIndexItem
              key={reservation.id}
              reservation={reservation}
              isEditing={editingReservationId === reservation.id}
              onSave={handleSave}
              onCancel={handleCancelClick}
              onEdit={handleEditClick}
              onDelete={handleDelete}
              upcoming={false}
            />
          ))}
        </>
      )}

      {upcomingReservations.length === 0 && pastReservations.length === 0 && (
        <div>
          <p>No trips booked yet</p>
          <button onClick={() => history.push('/')}>Explore Our Houses</button>
        </div>
      )}
    </div>
  );




}



export default ReservationIndex