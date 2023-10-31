export class AuthUtils {
  /**
   * token LocalStorage 键名
   */
  private static LOCAL_STORAGE_TOKEN = 'access_token'

  /**
   * 记住密码 LocalStorage 键名
   */
  static LOCAL_STORAGE_REMEMBERED_ACCOUNT = 'login_account_data'

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
   * 获取 authorization
   */
  static getAuthorization() {
    return `Bearer ${this.getToken()}`
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

  /**
   * 获取记住密码的账号密码
   * @description 用于登录页记住密码功能
   */
  static getRememberedAccount() {
    return localStorage.getItem(this.LOCAL_STORAGE_REMEMBERED_ACCOUNT)
  }

  /**
   * 设置记住密码的账号密码
   */
  static setRememberedAccount(data: string) {
    localStorage.setItem(this.LOCAL_STORAGE_REMEMBERED_ACCOUNT, data)
  }

  /**
   * 清除记住密码的账号密码
   */
  static clearRememberedAccount() {
    localStorage.removeItem(this.LOCAL_STORAGE_REMEMBERED_ACCOUNT)
  }
}
