import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { toggleReviewSuccess } from "../../store/ui";

const ReviewSuccess = ({listingId}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  
  const handleBackToListing = () => {
    history.push(`/listings/${listingId}`)
    dispatch(toggleReviewSuccess());
  }

 

  return(
    <Modal onClose={dispatch(toggleReviewSuccess())}>
      <h1>Thanks for your review</h1>
      <button className="success-review" onClick={handleBackToListing}>
        Stay at this listing
      </button>
    </Modal>

  );

}


export default ReviewSuccess;