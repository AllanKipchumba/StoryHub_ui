import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import signupReducer from "./slices/signupSlice";

export const rootReducer = combineReducers({
    logIn: loginReducer,
    signUp: signupReducer,
});