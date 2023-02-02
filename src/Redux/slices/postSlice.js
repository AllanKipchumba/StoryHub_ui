import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  reFetchComments: false,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    STORE_POSTS: (state, action) => {
      state.posts = action.payload;
    },
    REFETCH_COMMENTS: (state) => {
      state.reFetchComments = !state.reFetchComments;
    },
  },
});

export const { STORE_POSTS, REFETCH_COMMENTS } = postSlice.actions;

export default postSlice.reducer;
