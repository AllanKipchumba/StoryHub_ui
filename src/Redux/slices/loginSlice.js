import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    fetching: false,
    error: false,
    loading: false,
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
            state.fetching = false;
        },
        logout: (state, action) => {
            state.user = null;
            state.fetching = false;
            state.error = false;
        },
        loadingStart: (state, action) => {
            state.loading = true;
        },
        loadingStop: (state, action) => {
            state.loading = false;
        },
    },
});
// export actions
export const {
    loginStart,
    loginFail,
    loginSuccess,
    logout,
    loadingStart,
    loadingStop,
} = loginSlice.actions;
// axport reducer
export default loginSlice.reducer;