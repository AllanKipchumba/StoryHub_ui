import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
// import { rootReducer } from "./rootReducer";
import loginReducer from "./slices/loginSlice";
// redux-persist config
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const rootPersistConfig = {
    key: "root",
    storage,
};

const loginPersistConfig = {
    key: "login",
    storage,
    blacklist: ["fetching", "error"],
};

const rootReducer = combineReducers({
    logIn: persistReducer(loginPersistConfig, loginReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});

export const persistor = persistStore(store);