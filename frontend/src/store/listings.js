import csrfFetch from "./csrf";


const RECEIVE_LISTINGS = 'listings/receiveListings'
const RECEIVE_LISTING = 'listings/receiveListing'

export const receiveListings = listings => ({
  type: RECEIVE_LISTINGS,
  listings 
})

export const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  listing 
})

//for useSelector hook
export const getListings = (state) => state.entities.listings ? Object.values(state.entities.listings) : []
export const getListing = (listingId) => (state) => state && state.entities.listings ? state.entities.listings[listingId] : null



export const fetchListings = (query = '') => async dispatch => {
  const endpoint = query ? `/api/listings?location=${encodeURIComponent(query)}`
  : `/api/listings`;
  const res = await csrfFetch(endpoint);
  
  if (res.ok) {
    const data = await res.json();
    
    dispatch(receiveListings(data))
  }

}

export const fetchListing = (listingId) => async dispatch => {
  
  const res = await csrfFetch(`/api/listings/${listingId}`);
  
  
  if (res.ok) {
    const data = await res.json();
    
    dispatch(receiveListing(data))

  }
}

const listingsReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return { ...action.listings }
    case RECEIVE_LISTING:
      newState[action.listing.id] = action.listing
      return newState
    default:
      return state
  }
}


export default listingsReducer



