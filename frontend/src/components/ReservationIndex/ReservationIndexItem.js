import { useSelector, useDispatch } from "react-redux";
import { updateReservation, deleteReservation } from "../../store/reservations";
import React, { useState, useEffect } from 'react';
import { fetchListing, getListing } from "../../store/listings";
import { fetchUserReservations } from "../../store/reservations";
import "./ReservationIndexItem.css"
import { format, differenceInDays, parseISO } from "date-fns";
import { formatDateInUTC } from "../../utils/dateUtil";


const ReservationIndexItem = ({ reservation, isEditing, onSave, onCancel, onEdit, onDelete }) => {

  const dispatch = useDispatch();

  // const listing = useSelector(getListing(reservation.listingId))
  const [startDate, setStartDate] = useState(formatDateInUTC(reservation.startDate));
  const [endDate, setEndDate] = useState(formatDateInUTC(reservation.endDate));
  const [numGuests, setNumGuests] = useState(reservation.numGuests);
  const [totalCost, setTotalCost] = useState(reservation.totalCost);
  
  useEffect(() => {
    if (startDate && endDate) {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      const numOfDays = differenceInDays(end, start);
      const cost = numOfDays * reservation.listingPrice * 1.18; // Assuming nightlyPrice is passed as a prop or derived from state
      setTotalCost(cost);
    }
  }, [startDate, endDate, reservation.listingPrice]);

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   reservation.startDate = editingStartDate.format('YYYY-MM-DD');
  //   reservation.endDate = editingEndDate.format('YYYY-MM-DD');
  //   console.log("before dispatch",reservation)
  //   await dispatch(updateReservation(reservation
  //     // id: reservation.id,
  //     // startDate: editingStartDate.format('YYYY-MM-DD'), 
  //     // endDate: editingEndDate.format('YYYY-MM-DD')
  //   ));
  //   setIsEditing(false);
  // };
    
  return (
    <div className="reservation-item">
      <div className="listing-photo">
           <img id="p1" src={reservation.listingPhotoUrl[0]} alt="" />
      </div>
      <div className="trip-details">
        <div>{reservation.listing}</div>
        {isEditing ? ( 
        <>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          <select className="guests-dropdown" value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
            {Array.from({ length: reservation.listingMaxGuests }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
              ))}
          </select> 
          <div>total cost: ${totalCost}</div>


        </>) : (
        <>
          <div>Start Date: {formatDateInUTC(reservation.startDate, 'PP')}</div>
          <div>End Date: {formatDateInUTC(reservation.endDate, 'PP')}</div>
          <div>{differenceInDays(parseISO(reservation.endDate),parseISO(reservation.startDate))} nights</div>
          <div>Number of Guests: {reservation.numGuests}</div>
          <div>total cost: ${reservation.totalCost}</div>
        </>
        )}
      </div>

      {isEditing ? ( 
      <div className="trip-buttons">
        <button onClick={() => onSave(reservation.id, startDate, endDate, numGuests, totalCost)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
      ) : (
      <div className="trip-buttons">
        <button onClick={() => onEdit(reservation.id)}>Edit</button>
        <button onClick={() => onDelete(reservation.id)}>Delete</button>
      </div>
      )}    
    </div>
  );


}

export default ReservationIndexItem