import { useSelector, useDispatch } from "react-redux";
import { updateReservation, deleteReservation } from "../../store/reservations";
import React, { useState, useEffect } from 'react';
import { fetchListing, getListing } from "../../store/listings";
import { fetchUserReservations } from "../../store/reservations";
import "./ReservationIndexItem.css"
import { format, differenceInDays, parseISO } from "date-fns";
import { formatDateInUTC } from "../../utils/dateUtil";


const ReservationIndexItem = ({ reservation, isEditing, onSave, onCancel, onEdit, onDelete, upcoming}) => {
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
      <img className="reservation-listing-photo" id="p1" src={reservation.listingPhotoUrl[0]} alt="" />
  
      <div className="trip-text">
        <div className="trip-listing-name">{reservation.listing}</div>
        {isEditing ? ( 
        <div className="trip-details">
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          <select className="guests-dropdown" value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
            {Array.from({ length: reservation.listingMaxGuests }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
              ))}
          </select> 
          <div>Total Cost: ${Math.abs(totalCost)}</div>


        </div>) : (
        <div className="trip-details">
          <div>Start Date: {formatDateInUTC(reservation.startDate, 'PP')}</div>
          <div>End Date: {formatDateInUTC(reservation.endDate, 'PP')}</div>
          <div>{differenceInDays(parseISO(reservation.endDate),parseISO(reservation.startDate))} Nights</div>
          <div>{reservation.numGuests} Guest(s)</div>
          <div>Total Cost: ${Math.abs(reservation.totalCost)}</div>
        </div>
        )}
      </div>

      {upcoming && isEditing ? ( 
      <div className="trip-buttons-onedit">
        <button className="trip-save" onClick={() => onSave(reservation.id, startDate, endDate, numGuests, totalCost)}>Save</button>
        <button className="trip-cancel" onClick={onCancel}>Cancel</button>
      </div>
      
      ) : upcoming ? (
      <div className="trip-buttons">
        <button className="trip-edit" onClick={() => onEdit(reservation.id)}>Edit</button>
        <button className="trip-cancel" onClick={() => onDelete(reservation.id)}>Cancel</button>
      </div>
      ): null}    
    </div>
  );


}

export default ReservationIndexItem