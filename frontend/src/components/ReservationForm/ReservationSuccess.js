import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { toggleReservationSuccess } from "../../store/ui";
import './ReservationSuccess.css'



function ReservationSuccess({onClose}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleTrip = () => {
    dispatch(toggleReservationSuccess());
    history.push("/trips");
  }


  return(
    <Modal onClose={onClose}>
      <div className="reservation-success">
        <div className="reservation-success-message"> Reservation made successfully!!!</div>
        <button className="success-booking-trips" onClick={handleTrip}>
          Teleport to your trips page
        </button>

        <button className="success-booking-stay" onClick={onClose}>
          Stay to explore more
        </button>
      </div>

    </Modal>

  );
}

export default ReservationSuccess;