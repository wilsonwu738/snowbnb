import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { updateReservation, deleteReservation } from "../../store/reservations";
import React, { useState, useEffect } from 'react';
import { fetchListing, getListing } from "../../store/listings";
import { fetchUserReservations } from "../../store/reservations";
import "./ReservationIndexItem.css"
import { format, differenceInDays, parseISO } from "date-fns";


const ReservationIndexItem = ({ reservation, isEditing, onSave, onCancel, onEdit, onDelete }) => {

  const dispatch = useDispatch();

  // const listing = useSelector(getListing(reservation.listingId))
  const [startDate, setStartDate] = useState(format(parseISO(reservation.startDate), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(parseISO(reservation.endDate), 'yyyy-MM-dd'));
  const [numGuests, setNumGuests] = useState(reservation.numGuests);
  

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

  

  // if (isEditing) {
  //   return (
  //     <div className="reservation-item">
  //       <div className="listing-photo">
  //          <img id="p1" src={reservation.listingPhotoUrl[0]} alt="" />
  //       </div>
  //       <div className="trip-details">
  //         <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
  //         <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
  //         <select className="guests-dropdown" value={numGuests} onChange={(e) => setNumGuests(e.target.value)}>
  //           {Array.from({ length: reservation.listingMaxGuests }, (_, i) => (
  //             <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
  //             ))}
  //         </select>
  //       </div>
  //       <div className="trip-buttons">
  //         <button onClick={() => onSave(reservation.id, startDate, endDate, numGuests)}>Save</button>
  //         <button onClick={onCancel}>Cancel</button>
  //       </div>
  //     </div>
  //   );
  // }
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
        </>) : (
        <>
          <div>Start Date: {format(parseISO(reservation.startDate), 'PP')}</div>
          <div>End Date: {format(parseISO(reservation.endDate), 'PP')}</div>
          <div>{differenceInDays(parseISO(reservation.endDate),parseISO(reservation.startDate))} nights</div>
          <div>Number of Guests: {reservation.numGuests}</div>
          <div>${reservation.totalCost}</div>
        </>
        )}
      </div>

      {isEditing ? ( 
      <div className="trip-buttons">
        <button onClick={() => onSave(reservation.id, startDate, endDate, numGuests)}>Save</button>
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