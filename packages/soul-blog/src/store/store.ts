import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
const store = configureStore({
  reducer: {
    user: userReducer
  },
})
// 从 store 对象中推断出state\dispatch 类型, 利用ts内置的工具类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export default store