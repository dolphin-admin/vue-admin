import { BasePageModel } from '@/constants'

export class UserPageModel extends BasePageModel {
  /**
   * 认证类型
   * @description 多个认证类型用逗号分隔
   */
  authTypes?: string

  constructor(userPageModel: UserPageModel) {
    const { authTypes, ...basePageModel } = userPageModel
    super(basePageModel)
    if (authTypes) {
      this.authTypes = authTypes
    }
  }
}
