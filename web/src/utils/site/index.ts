const { t } = i18n.global

export class SiteUtils {
  /**
   * 设置站点标题
   * @param title 标题
   */
  static setDocumentTitle(title?: string | (() => string)) {
    if (!title) {
      useTitle(t('App.Name'))
    } else {
      useTitle(typeof title === 'function' ? title() : title, {
        titleTemplate: `%s | ${t('App.Name')}`
      })
    }
  }
}
