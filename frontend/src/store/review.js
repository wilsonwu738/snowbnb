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

export const fetchReviews = (listingId) => async dispatch => {
  const res = await csrfFetch(`/api/listings/${listingId}/reviews`)
  
}