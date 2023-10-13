import { createSlice } from "@reduxjs/toolkit";

const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    messages: null,
    type: null
  },
  reducers: {
    setErrors: (state, action) => {
      state.messages = action.payload.messages;
      state.type = action.payload.type;
    },
    clearErrors: (state) => {
      state.messages = null;
      state.type = null;
    }
  }
})

export const { setErrors, clearErrors } = errorsSlice.actions;

export default errorsSlice.reducer;