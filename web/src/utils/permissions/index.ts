export class PermissionUtils {
  /**
   * 超级管理员权限
   */
  static ALL_PERMISSION = '*:*:*'

  /**
   * 权限校验
   * @param {string[] | string} value 功能需要的权限
   * @return {Boolean}
   */

  static hasPermission = (value: string[] | string) => {
    const permission = ['user-management:user-list:create']

    if (!value || permission.includes(this.ALL_PERMISSION)) {
      return true
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true
      }

      return permission.some((permission) => value.includes(permission))
    }

    return permission.includes(value)
  }
}
