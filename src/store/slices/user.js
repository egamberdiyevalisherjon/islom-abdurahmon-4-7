import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  info: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserData(state, action) {
      state.info = action.payload;
    },
  },
});

export const { loadUserData } = userSlice.actions

export default userSlice.reducer
