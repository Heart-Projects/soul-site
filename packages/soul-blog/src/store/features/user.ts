import { info } from './../../../node_modules/sass/types/index.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type {UserInfo, UserLoginInfo} from '@/types/user';
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
    setUserInfo: (state, action: PayloadAction<UserLoginInfo>) => {
      const {hasLogin, info} = action.payload
      state.hasLogin = hasLogin
      if (hasLogin) {
        state.username = info.username
        state.userId = info.userId
        state.menus = info.menus
        state.roles = info.roles
        state.exp = info.exp
      }
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