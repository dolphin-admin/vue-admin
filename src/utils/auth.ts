export class AuthUtils {
  /**
   * 存储键名
   */
  private static LOCAL_STORAGE_TOKEN = 'access_token'

  /**
   * 默认管理员用户名
   */
  static DEFAULT_ADMIN_USERNAME = 'SuperAdmin'

  /**
   * 默认管理员密码
   */
  static DEFAULT_PASSWORD = '123456'

  /**
   * 获取 token
   */
  static getToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_TOKEN)
  }

  /**
   * 设置 token
   * @param token
   */
  static setToken(token: string) {
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN, token)
  }

  /**
   * 清除 token
   */
  static clearToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN)
  }

  /**
   * 判断当前是否已经登录
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(this.LOCAL_STORAGE_TOKEN)
  }
}
