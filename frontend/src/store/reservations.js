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

export const fetchReservations = () => async dispatch => {
  const res = await csrfFetch(`/api/reservations`);
  if (res.ok) {
    const data = await res.json(); //this is the body
    dispatch(receiveReservations(data))
  }
  //add error handling later
  return res
}

export const fetchReservation = reservationId => async dispatch => {
  const res = await csrfFetch(`/api/reservations/${reservationId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReservation(data))
  }
  return res
}

export const createReservation = (reservation) => async dispatch => {
  const res = await csrfFetch(`/api/reservations`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reservation)
  });
  
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveReservation(data))
  }

  return res
}

export const updateReservation = (reservation) => async dispatch => {
  const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reservation)
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



  