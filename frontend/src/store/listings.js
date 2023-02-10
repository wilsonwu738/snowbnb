import csrfFetch from "./csrf";


const RECEIVE_LISTINGS = 'listings/receiveListings'

export const receiveListings = listings => ({
  type: RECEIVE_LISTINGS
})

export const fetchListings = () => async dispatch => {
  const response = await csrfFetch(`api/listings`);
  const data = await response.json();
  dispatch(receiveListings(data))
}

const listingsReducer = (state = {}, action) => {
  switch (action.type) {
    case receiveListings:
      return action.listings;
  
  default:
    return state
  }
}


export default listingsReducer



