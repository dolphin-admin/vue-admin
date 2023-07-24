export class NavigationUtils {
  /**
   *  LocalStorage 健值名 AddShortcut
   */
  static LOCAL_STORAGE_NAVIGATION_SHORTCUTS = 'navigation_shortcuts'

  /**
   * 获取 AddShortcut
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
  static setAddShortcuts(value: string) {
    const oldValue = NavigationUtils.getShortcuts()
    oldValue.push(value)
    const valueStorage = JSON.stringify(oldValue)
    localStorage.setItem(this.LOCAL_STORAGE_NAVIGATION_SHORTCUTS, valueStorage)
  }

  /**
   * 移除快捷方式
   */
  static setReductionShortcuts(value: string) {
    const oldValue = NavigationUtils.getShortcuts()
    const newValue = oldValue.filter((item: string) => item !== value)
    const valueStorage = JSON.stringify(newValue)
    localStorage.setItem(this.LOCAL_STORAGE_NAVIGATION_SHORTCUTS, valueStorage)
  }
}
