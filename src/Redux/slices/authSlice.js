import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH_SUCCESS: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    LOGOUT: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});
// export actions
export const { AUTH_SUCCESS, LOGOUT } = authSlice.actions;
// export reducer
export default authSlice.reducer;
