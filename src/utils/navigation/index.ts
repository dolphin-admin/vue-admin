export class NavigationUtils {
  /**
   * token LocalStorage 健名 AddShortcut
   */
  static LOCAL_STORAGE_ADD_SHORTCUT = 'AddShortcut'

  /**
   * 获取 AddShortcut
   */
  static getAddShortcut() {
    const AddShortcut = localStorage.getItem(this.LOCAL_STORAGE_ADD_SHORTCUT)
    let value
    try {
      value = AddShortcut ? JSON.parse(AddShortcut) : []
    } catch {
      value = []
    }
    return value
  }

  /**
   * 设置localStorage增加一个快捷方式
   */
  static setAddShortcut(value: string) {
    const oldValue = NavigationUtils.getAddShortcut()
    oldValue.push(value)
    const valueStorage = JSON.stringify(oldValue)
    localStorage.setItem(this.LOCAL_STORAGE_ADD_SHORTCUT, valueStorage)
  }

  /**
   * 设置localStorage减少一个快捷方式
   */
  static setReductionShortcut(value: string) {
    const oldValue = NavigationUtils.getAddShortcut()
    const newValue = oldValue.filter((item: string) => item !== value)
    const valueStorage = JSON.stringify(newValue)
    localStorage.setItem(this.LOCAL_STORAGE_ADD_SHORTCUT, valueStorage)
  }
}
