export const LOCAL_STORAGE_TOKEN = 'access_token'

export const getToken = () => localStorage.getItem(LOCAL_STORAGE_TOKEN)

export const setToken = (token: string) => localStorage.setItem(LOCAL_STORAGE_TOKEN, token)

export const clearToken = () => localStorage.removeItem(LOCAL_STORAGE_TOKEN)

export const isAuthenticated = () => !!localStorage.getItem(LOCAL_STORAGE_TOKEN)
