export class GitHubAuthUtils {
  /**
   * GitHub OAuth2.0 授权地址
   */
  static GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize'

  /**
   * GitHub OAuth2.0 回调地址
   */
  static GITHUB_REDIRECT_URL = `${GlobalEnvConfig.APP_BASE_URL}/auth-redirect?type=github`

  /**
   * 授权窗口宽度
   */
  private static AUTH_WINDOW_WIDTH = 800

  /**
   * 授权窗口高度
   */
  private static AUTH_WINDOW_HEIGHT = 600

  /**
   * 获取 GitHub OAuth2.0 授权地址
   */
  static getAuthUrl(): string {
    return `${this.GITHUB_AUTH_URL}?client_id=${GlobalEnvConfig.GITHUB_CLIENT_ID}&redirect_uri=${this.GITHUB_REDIRECT_URL}`
  }

  /**
   * 打开 GitHub 授权窗口
   * @param url 授权地址
   */
  static openAuthWindow(url: string) {
    const title = 'GitHub Authorization'

    // 窗口位置
    const left =
      window.screenX + (window.outerWidth - this.AUTH_WINDOW_WIDTH) / 2
    const top =
      window.screenY + (window.outerHeight - this.AUTH_WINDOW_HEIGHT) / 2

    // 窗口参数
    const options = `width=${this.AUTH_WINDOW_WIDTH},height=${this.AUTH_WINDOW_HEIGHT},left=${left},top=${top},location=no,menubar=no,toolbar=no,titlebar=no,scrollbars=yes,resizable=yes`

    return window.open(url, title, options)
  }
}
