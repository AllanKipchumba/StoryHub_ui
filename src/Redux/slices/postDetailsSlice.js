import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: {},
};

const postDetailsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        STORE_POST: (state, action) => {
            state.post = action.payload;
        },
    },
});

export const { STORE_POST } = postDetailsSlice.actions;

export default postDetailsSlice.reducer;