import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import appReducer from "./features/appSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;