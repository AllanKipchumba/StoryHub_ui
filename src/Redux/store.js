import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
// redux-persist config
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import postsReducer from "./slices/postSlice";
import postReducer from "./slices/postDetailsSlice";

//persist user state
const loginPersistConfig = {
  key: "login",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  logIn: persistReducer(loginPersistConfig, loginReducer),
  posts: postsReducer,
  post: postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
