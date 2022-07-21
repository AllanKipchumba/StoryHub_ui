import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    posting: false,
    error: false,
};

const signupSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signupStart: (state, action) => {
            state.posting = true;
        },
        signupSuccess: (state, action) => {
            state.posting = false;
            state.user = action.payload;
        },
        signupFail: (state, action) => {
            state.error = true;
        },
    },
});

// export actions
export const { signupStart, signupSuccess, signupFail } = signupSlice.actions;
// export reducer
export default signupSlice.reducer;