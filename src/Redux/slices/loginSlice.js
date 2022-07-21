import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    fetching: false,
    error: false,
};

const loginSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state, action) => {
            state.fetching = true;
        },
        loginSuccess: (state, action) => {
            state.fetching = false;
            state.user = action.payload;
        },
        loginFail: (state, action) => {
            state.error = true;
        },
        logout: (state, action) => {
            state.user = null;
            state.fetching = false;
            state.error = false;
        },
    },
});
// export actions
export const { loginStart, loginFail, loginSuccess, logout } =
loginSlice.actions;
// axport reducer
export default loginSlice.reducer;