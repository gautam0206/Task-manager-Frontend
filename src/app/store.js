import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todo";
import authReducer from "../slices/auth"
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth:authReducer,
  },
});
