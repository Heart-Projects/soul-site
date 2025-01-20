import Cookie from 'js-cookie';
export const TOKEN_KEY = 'access_token'

export function getToken() {
  return Cookie.get(TOKEN_KEY) || ''
}

export function setToken(token: string) {
    Cookie.set(TOKEN_KEY, token, { expires: 7 })
}

export function clearSaveCookie() {
    Cookie.remove(TOKEN_KEY)
}