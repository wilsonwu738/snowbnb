import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { toggleReviewSuccess } from "../../store/ui";
import './ReviewSuccess.css'

const ReviewSuccess = ({listingId}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  
  const handleBackToListing = () => {
    dispatch(toggleReviewSuccess());
    history.push(`/listings/${listingId}`)
  }

  const handleBackToHome = () => {
    dispatch(toggleReviewSuccess());
    history.push(`/`)
  }

 

  return(
    <Modal onClose={() => dispatch(toggleReviewSuccess())}>
      <div className="review-success-container">
        <h1>Thanks for your review!!!</h1>
        <button className="review-success-stay" onClick={handleBackToListing}>
          Stay at this listing
        </button>

        <button className="review-success-back" onClick={handleBackToHome}>
          Explore other home
        </button>
      </div>


    </Modal>

  );

}


export default ReviewSuccess;