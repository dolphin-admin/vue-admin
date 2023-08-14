export class PermissionUtils {
  /**
   * 超级管理员权限
   */
  static ALL_PERMISSION = '*:*:*'

  /**
   * 权限校验
   */
  static hasPermission = (value: string[] | string) => {
    const permissions = ['user-management:user-list:create']

    if (!value || permissions.includes(this.ALL_PERMISSION)) {
      return true
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true
      }

      return permissions.some((permission) => value.includes(permission))
    }

    return permissions.includes(value)
  }
}
