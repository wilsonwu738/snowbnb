import csrfFetch from "./csrf";

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

export const getReviews = (state) => state.reviews ? Object.values(state.reviews) : []


export const fetchReviews = (listingId) => async dispatch => {
  console.log("before csrf")
  const res = await csrfFetch(`/api/listings/${listingId}/reviews`);

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReviews(data))
  }

  return res
}

export const createReview = (listingId, review) => async dispatch => {
  console.log("in thunk",JSON.stringify(review))
  const res = await csrfFetch(`/api/listings/${listingId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({review: {...review, listingId: listingId}})
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data));
  }

  return res;
}

export const updateReview = (listingId, review) => async dispatch => {
  const res = await csrfFetch(`/api/listing/${listingId}/reviews/${review.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReview(data));
  }

  return res;

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
      return { ...state, ...action.reviews };
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