import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        STORE_POSTS: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export const { STORE_POSTS } = postSlice.actions;

export default postSlice.reducer;