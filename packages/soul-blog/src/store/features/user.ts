import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type {UserInfo} from '@/types/user';
interface UserState extends UserInfo {
  hasLogin: boolean
}

const initialState: UserState = {
  username: '',
  hasLogin: false,
  userId: 0,
  menus: [],
  roles: [],
  exp: 0
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.username = action.payload.username
      state.userId = action.payload.userId
      state.menus = action.payload.menus
      state.roles = action.payload.roles
      state.exp = action.payload.exp
      state.hasLogin = true
    },
    clearUseInfo: (state) => {
      state = initialState
    }
  },
})
export const selectUsername = (state: RootState) => state.user.username
export const selectUserInfo = (state: RootState) => state.user
export const { setUsername, setUserInfo, clearUseInfo } = userSlice.actions

export default userSlice.reducer