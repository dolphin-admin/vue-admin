export class AuthUtils {
  /**
   * @description Token 存储键名
   */
  private static LOCAL_STORAGE_TOKEN = 'access_token'

  /**
   * @description 获取 Token
   */
  static getToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_TOKEN)
  }

  /**
   * @description 设置 Token
   * @param token
   */
  static setToken(token: string) {
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN, token)
  }

  /**
   * @description 清除 Token
   */
  static clearToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN)
  }

  /**
   * @description 判断当前是否已经登录
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(this.LOCAL_STORAGE_TOKEN)
  }
}
