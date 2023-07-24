export class NavigationUtils {
  /**
   *  LocalStorage 健值名 AddShortcut
   */
  static LOCAL_STORAGE_NAVIGATION_SHORTCUTS = 'navigation_shortcuts'

  /**
   * 获取快捷方式列表
   */
  static getShortcuts() {
    const shortcuts = localStorage.getItem(this.LOCAL_STORAGE_NAVIGATION_SHORTCUTS)
    if (!shortcuts) return []
    try {
      return JSON.parse(shortcuts)
    } catch {
      return []
    }
  }

  /**
   * 增加快捷方式
   */
  static setShortcut(key: string) {
    const shortcuts = this.getShortcuts()
    shortcuts.push(key)
    const stringifiedValue = JSON.stringify(shortcuts)
    localStorage.setItem(this.LOCAL_STORAGE_NAVIGATION_SHORTCUTS, stringifiedValue)
  }

  /**
   * 移除快捷方式
   */
  static removeShortcut(key: string) {
    const shortcuts = this.getShortcuts()
    localStorage.setItem(
      this.LOCAL_STORAGE_NAVIGATION_SHORTCUTS,
      JSON.stringify(shortcuts.filter((item: string) => item !== key))
    )
  }
}
