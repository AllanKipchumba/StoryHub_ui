import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH_SUCCESS: (state, action) => {
      state.fetching = false;
      state.user = action.payload;
    },

    LOGOUT: (state, action) => {
      state.user = null;
    },
  },
});
// export actions
export const { AUTH_SUCCESS, LOGOUT } = authSlice.actions;
// export reducer
export default authSlice.reducer;
