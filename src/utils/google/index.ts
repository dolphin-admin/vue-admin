export class GoogleAuthUtils {
  /**
   * Google OAuth2.0 授权地址
   */
  static GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'

  /**
   * Google OAuth2.0 回调地址
   */
  static GOOGLE_REDIRECT_URL = `${GlobalEnvConfig.APP_BASE_URL}/auth-redirect?type=google`

  /**
   * 授权窗口宽度
   */
  private static AUTH_WINDOW_WIDTH = 800

  /**
   * 授权窗口高度
   */
  private static AUTH_WINDOW_HEIGHT = 600

  /**
   * 获取 Google OAuth2.0 授权地址
   */
  static getAuthUrl(): string {
    return `${this.GOOGLE_AUTH_URL}?client_id=${GlobalEnvConfig.GOOGLE_CLIENT_ID}&redirect_uri=${this.GOOGLE_REDIRECT_URL}&response_type=code&scope=openid%20profile%20email`
  }

  /**
   * 打开 Google 授权窗口
   * @param url 授权地址
   */
  static openAuthWindow(url: string) {
    const title = 'Google Authorization'

    // 窗口位置
    const left = window.screenX + (window.outerWidth - this.AUTH_WINDOW_WIDTH) / 2
    const top = window.screenY + (window.outerHeight - this.AUTH_WINDOW_HEIGHT) / 2

    // 窗口参数
    const options = `width=${this.AUTH_WINDOW_WIDTH},height=${this.AUTH_WINDOW_HEIGHT},left=${left},top=${top},location=no,menubar=no,toolbar=no,titlebar=no,scrollbars=yes,resizable=yes`

    return window.open(url, title, options)
  }
}
