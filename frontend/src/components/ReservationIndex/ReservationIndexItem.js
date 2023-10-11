import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { updateReservation, deleteReservation } from "../../store/reservations";
import React, { useState, useEffect } from 'react';
import "react-dates/lib/css/_datepicker.css";
import { fetchListing, getListing } from "../../store/listings";
import "./ReservationIndexItem.css"


//can i use reservation connecting to listings?
const ReservationIndexItem = ({ reservation }) => {
  // const listingUrl = useSelector(state => {
  //   return state.listings[reservation.listingId].photoUrl
  // })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListing(reservation.listingId))
  }, [dispatch, reservation.listingId])
  const listing = useSelector(getListing(reservation.listingId))

  const [isEditing, setIsEditing] = useState(false);
  const [editingStartDate, setEditingStartDate] = useState(null);
  const [editingEndDate, setEditingEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const startEditing = () => {
    setIsEditing(true);
    setEditingStartDate(moment(reservation.startDate));
    setEditingEndDate(moment(reservation.endDate));
  };
  
  const handleDatesChange = ({ startDate, endDate }) => {
    setEditingStartDate(startDate);
    setEditingEndDate(endDate);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    reservation.startDate = editingStartDate.format('YYYY-MM-DD');
    reservation.endDate = editingEndDate.format('YYYY-MM-DD');
    console.log("before dispatch",reservation)
    await dispatch(updateReservation(reservation
      // id: reservation.id,
      // startDate: editingStartDate.format('YYYY-MM-DD'), 
      // endDate: editingEndDate.format('YYYY-MM-DD')
    ));
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
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <div className="listing-photo">
            <img id="p1" src={listing?.photoUrl[0]} alt="" />
          </div>
          <p>Start date: {moment(reservation.startDate).format('YYYY-MM-DD')}</p>
          <p>End date: {moment(reservation.endDate).format('YYYY-MM-DD')}</p>
          <button onClick={startEditing}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default ReservationIndexItem