import csrfFetch from "./csrf";
import { setErrors } from "./errors";
import { toggleReviewSuccess } from "./ui";

const RECEIVE_REVIEWS = 'reviews/receiveReviews'
const RECEIVE_REVIEW = 'reviews/receiveReview'
const REMOVE_REVIEW = 'reviews/removeReview'

export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
})

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
})

export const removeReview = reviewId => ({
  type: REMOVE_REVIEW,
  reviewId
})

export const getReviews = (state) => state.entities.reviews ? Object.values(state.entities.reviews) : []


export const fetchReviews = (listingId) => async dispatch => {
  console.log("insider csrf fetch", listingId)
  const res = await csrfFetch(`/api/listings/${listingId}/reviews`);

  if (res.ok) {
    const data = await res.json();
  
    dispatch(receiveReviews(data))
  }

  return res
}

export const fetchReview = (listingId, reviewId) => async dispatch => { 
  const res = await csrfFetch(`/api/listings/${listingId}/reviews/${reviewId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data))
  }

  return res
}

export const createReview = (listingId, review) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/listings/${listingId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    });
  
    if (res.ok) {
      const data = await res.json();
      dispatch(receiveReview(data));
      dispatch(toggleReviewSuccess());
      return res;
    } 
  } catch (errRes) {
  
      const errData = await errRes.json();
    
      dispatch(setErrors({
        messages: errData.errors || "An unexpected error occurred.",
        type: 'CREATE_REVIEW_ERROR'
    }))

  }

}

export const updateReview = (listingId, review) => async dispatch => {
  // console.log("inside updateReview:", review)
  // console.log("inside updateReview for id:", review.review.id)

  try {
    const res = await csrfFetch(`/api/listings/${listingId}/reviews/${review.review.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    });
    
    if (res.ok) {
      const data = await res.json();
      dispatch(receiveReview(data));
      dispatch(toggleReviewSuccess());

      return res;
    }
  } catch (errRes) {
    const errData = await errRes.json();
    dispatch(setErrors({
      messages: errData.errors || "An unexpected error occurred.",
      type: 'UPDATE_REVIEW_ERROR'
  }))
  }


}

export const deleteReview = (listingId, reviewId) => async dispatch => {
  const res = await csrfFetch(`/api/listings/${listingId}/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeReview(reviewId));
  };

  return res;
}

const reviewsReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_REVIEWS:
      console.log("inside reducer", action.reviews)
      return action.reviews
    case RECEIVE_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer