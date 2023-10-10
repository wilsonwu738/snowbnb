import csrfFetch from './csrf';

const RECEIVE_RESERVATIONS = 'reservations/receiveReservations'
const RECEIVE_RESERVATION = 'reservations/receiveReservation'
const DELETE_RESERVATION = 'reservations/deleteReservation'

export const receiveReservations = reservations => ({
  type: RECEIVE_RESERVATIONS,
  reservations 
})

export const receiveReservation = reservation => ({
  type: RECEIVE_RESERVATION,
  reservation
})

export const removeReservation = reservationId => ({
  type: DELETE_RESERVATION,
  reservationId
})

//for future enhancement in state form
// const SET_RESERVATION_ERROR = 'reservations/setReservationError';

// export const setReservationError = error => ({
//   type: SET_RESERVATION_ERROR,
//   error
// });


//for useSelector hook
export const getReservations = (state) => state.reservations ? Object.values(state.reservations) : []
export const getReservation = (reservationId) => (state) => state && state.reservations ? state.reservations[reservationId] : null


//thunk action creators

//updated to include params listingId so that i can fetch only a subset of reservations without setting up nested routes. 

export const fetchListingReservations = (listingId) => async dispatch => {
  // let endpoint = `/api/reservations`;
  // if (listingId) {
  //   endpoint += `?listingId=${listingId}`;
  // }
  const res = await csrfFetch(`/api/listings/${listingId}/reservations`);
  if (res.ok) {
    const data = await res.json(); //this is the body
    dispatch(receiveReservations(data))
  }
  //add error handling later
  return res
}

export const fetchUserReservations = () => async dispatch =>{
  const res = await csrfFetch(`/api/reservations`);
  if (res.ok)  {
    const data = await res.json();
    dispatch(receiveReservations(data))
  }
}

export const fetchReservation = reservationId => async dispatch => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReservation(data))
  }
  return res
}

// delete the else for error?
export const createReservation = (reservation) => async dispatch => {
  try {
    const res = await csrfFetch(`/api/reservations`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    });
  
    if (res.ok) {
      const data = await res.json();
      dispatch(receiveReservation(data));
      console.log(data)
      return { ok: true, data };
    } 
    // else {
    //   const errData = await res.json();
    //   console.log(errData)
    //   console.log("hit error redux")
    //   return { ok: false, errors: errData.errors};
    // }
  } catch (error) {
    const errData = await error.json();
    console.log("catch block error", Object.values(errData))
    
    return { ok: false, errors: Object.values(errData) };
  }

}

//i normally prefer the reservation to stay as it is, but if i structure it in frontend, it does not work with permit :id in rails

export const updateReservation = (reservation) => async dispatch => {
  const { id, ...otherAttributes } = reservation;
  console.log("inside fetch", reservation)
  const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reservation: otherAttributes })
  });
  
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReservation(data))
  }

  return res
}

export const deleteReservation = (reservationId) => async dispatch => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`, {
    method: "DELETE"
  });
  
  if (res.ok) { 
    dispatch(removeReservation(reservationId))
  }
}

const reservationsReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      return { ...state, ...action.reservations }
    case RECEIVE_RESERVATION:
      newState[action.reservation.id] = action.reservation
      return newState
    case DELETE_RESERVATION:
      delete newState[action.reservationId]
      return newState
    default:
      return state
  }
}

export default reservationsReducer



  