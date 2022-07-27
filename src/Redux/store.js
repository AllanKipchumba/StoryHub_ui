import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
// redux-persist config
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

//persist all but fetching and error states from login reducer
const loginPersistConfig = {
    key: "login",
    storage,
    blacklist: ["fetching", "error", "loading"],
};

const rootReducer = combineReducers({
    logIn: persistReducer(loginPersistConfig, loginReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export const persistor = persistStore(store);