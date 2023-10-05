import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { updateReservation, deleteReservation } from "../../store/reservations";
import React, { useState } from 'react';
import "react-dates/lib/css/_datepicker.css";


//can i use reservation connecting to listings?
const ReservationIndexItem = ({ reservation }) => {
  // const listingUrl = useSelector(state => {
  //   return state.listings[reservation.listingId].photoUrl
  // })
  const dispatch = useDispatch();
  // const 

  const [isEditing, setIsEditing] = useState(false);
  const [editingStartDate, setEditingStartDate] = useState(null);
  const [editingEndDate, setEditingEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const startEditing = () => {
    setIsEditing(true);
    setEditingStartDate(moment(reservation.startDate)); // assuming dates are in a usable format
    setEditingEndDate(moment(reservation.endDate));
  };
  
  const handleDatesChange = ({ startDate, endDate }) => {
    setEditingStartDate(startDate);
    setEditingEndDate(endDate);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Dispatch the update to the Redux store, assuming your action is set up to handle the API call
    await dispatch(updateReservation(reservation
      // id: reservation.id,
      // startDate: editingStartDate.format('YYYY-MM-DD'), // format as per your API needs
      // endDate: editingEndDate.format('YYYY-MM-DD')
    ));
    console.log(reservation)
    setIsEditing(false);
  };

  const handleDelete = () => {
    console.log(reservation.id)
    dispatch(deleteReservation(reservation.id))
  }

  return (
    <div className="reservation-item">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <DateRangePicker
            startDate={editingStartDate}
            startDateId="start_date"
            endDate={editingEndDate}
            endDateId="end_date"
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={focused => setFocusedInput(focused)}
            // ... any other required props ...
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Start date: {reservation.startDate}</p>
          <p>End date: {reservation.endDate}</p>
          <button onClick={startEditing}>Update</button>
          <button onClick={handleDelete}>Delete</button>

          {/* Other display elements... */}
        </>
      )}
    </div>
  );
}

export default ReservationIndexItem