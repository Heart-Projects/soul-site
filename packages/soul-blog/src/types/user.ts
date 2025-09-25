export type UserInfo = {
  exp: number,
  menus: string[],
  roles: string[],
  userId: number
  username: string
}

export type UserLoginInfo = {
  hasLogin: boolean
  info: UserInfo
}