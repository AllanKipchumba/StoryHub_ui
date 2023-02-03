import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postSlice";
import postReducer from "./slices/postDetailsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  post: postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {
  localStorage.setItem("user", JSON.stringify(store.getState().auth.user));
});
