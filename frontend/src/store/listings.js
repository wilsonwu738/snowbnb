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
export const getListings = (state) => state.listings ? Object.values(state.listings) : []
export const getListing = (listingId) => (state) => state.listings ? state.listings[listingId] : null



export const fetchListings = () => async dispatch => {
  const res = await csrfFetch(`api/listings`);

  if (res.ok) {
    const data = await res.json();
    console.log(`this is in fetchlistings: ${data}`)
    dispatch(receiveListings(data))
  }
}

export const fetchListing = (listingId) => async dispatch => {
  const res = await csrfFetch(`api/listings${listingId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(receiveListings(data))
  }
}

const listingsReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return { ...state, ...action.listings }
    case RECEIVE_LISTING:
      return newState[action.listing.id] = action.listing
    default:
      return state
  }
}


export default listingsReducer



