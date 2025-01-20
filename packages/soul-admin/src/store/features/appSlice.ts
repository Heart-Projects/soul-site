import { createSlice } from "@reduxjs/toolkit";

export interface ThemeConfig {
  /**
   * 主题色
   */
  primaryColor: string
}

export interface AppState {
  /**
   * 菜单是否折叠
   */
  menuCollapse: boolean
  /**
   * 主题配置
   */
  theme: ThemeConfig
}

const initialState: AppState = {
  menuCollapse: false,
  theme: {
    primaryColor: 'light'
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMenuCollapse: (state, { payload }: {payload: boolean}) => {
      console.log('setMenuCollapse', payload);
      state.menuCollapse = payload
    },
    setTheme: (state, {payload}: {payload: ThemeConfig}) => {
      state.theme = Object.assign(state.theme, payload)
    }
  }
})

export const { setMenuCollapse, setTheme } = appSlice.actions
export default appSlice.reducer