import { ApiProperty } from '@nestjs/swagger'
import { Equals } from 'class-validator'

import { AuthUsernameLoginDto } from './auth-username-login-dto'

export class AuthSignupDto extends AuthUsernameLoginDto {
  @ApiProperty({ description: '确认密码', type: 'string' })
  @Equals('password', { message: '两次输入密码不一致' })
  readonly confirmPassword: string
}
