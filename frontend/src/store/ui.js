import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showLogin: false,
    showSignup: false,
    showMenu: false,
    showReservationSuccess: false
  },
  reducers: {
    toggleLogin: (state) => {state.showLogin = !state.showLogin},
    toggleSignup: (state) => {state.showSignup = !state.showSignup},
    toggleMenu: (state) => {state.showMenu = !state.showMenu},
    toggleReservationSuccess: (state) => {state.showReservationSuccess = !state.showReservationSuccess}
  }
});

export const { toggleLogin, toggleSignup, toggleMenu, toggleReservationSuccess } = uiSlice.actions;

export default uiSlice.reducer;