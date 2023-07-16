import { BasePageModel } from '@/constants'

import type { UserCustomPageModel } from './types'

export class UserPageModel extends BasePageModel {
  /**
   * 认证类型
   * @description 多个认证类型用逗号分隔
   */
  authTypes?: string

  constructor(userPageModel: UserCustomPageModel) {
    const { authTypes, ...pageModel } = userPageModel
    super(pageModel)
    if (authTypes) {
      this.authTypes = authTypes
    }
  }
}
