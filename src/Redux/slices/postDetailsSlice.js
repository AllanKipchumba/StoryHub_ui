import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {},
  previousURL: "",
};

const postDetailsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    STORE_POST: (state, action) => {
      state.post = action.payload;
    },
    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

export const { STORE_POST, SAVE_URL } = postDetailsSlice.actions;

export default postDetailsSlice.reducer;
