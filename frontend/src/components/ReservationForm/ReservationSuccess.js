import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { toggleReservationSuccess } from "../../store/ui";
import './ReservationSuccess.css'



function ReservationSuccess({ onClose, listing }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleTrip = () => {
    dispatch(toggleReservationSuccess());
    history.push("/trips");
  }

  const handleHome = () => {
    dispatch(toggleReservationSuccess());
    history.push("/");
  }


  return(
    <Modal onClose={onClose}>
      <div className="reservation-success">
        <div className="reservation-success-message">Your reservation is confirmed</div>
        <div className="reservation-success-location">You are going to {listing.location} </div>
        <img className="reservation-success-photo" src={listing.photoUrl[0]} alt="" />
        <div className="success-booking-buttons">
          <button className="success-booking-trips" onClick={handleTrip}>
            Teleport to your trips page
          </button>

          <button className="success-booking-stay" onClick={handleHome}>
            Explore other home
          </button>
        </div>
      </div>

    </Modal>

  );
}

export default ReservationSuccess;