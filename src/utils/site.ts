const { APP_NAME } = AppMetadata

export class SiteUtils {
  /**
   * 设置站点标题
   * @param title 标题
   */
  static setDocumentTitle(title?: string | (() => string)) {
    console.log(title)
    if (!title) {
      useTitle(APP_NAME)
    } else {
      useTitle(typeof title === 'function' ? title() : title, {
        titleTemplate: `%s | ${APP_NAME}`
      })
    }
  }
}
