import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  name: string
  age: number
}

const initialState: UserState = {
  name: 'shenjin',
  age: 0
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setAge: (state, action) => {
      state.age = action.payload
    }
  }
})

export const { setName, setAge } = userSlice.actions

export default userSlice.reducer