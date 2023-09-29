import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';



function ReservationSuccess({onClose}) {
  const history = useHistory();

  const handleTrip = () => {
    history.push("/trips")
  }


  return(
    <Modal onClose={onClose}>
      <button className="success-booking-trips" onClick={handleTrip}>
        Teleport to your trips page
      </button>

      <button className="success-booking-stay" onClick={onClose}>
        Stay to explore more
      </button>

    </Modal>

  );
}

export default ReservationSuccess;