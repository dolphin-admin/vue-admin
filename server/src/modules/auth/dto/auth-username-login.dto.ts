import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthUsernameLoginDto {
  @ApiProperty({ description: '用户名', type: 'string', minimum: 4 })
  @MinLength(4, { message: '用户名长度不能小于4位' })
  @IsString({ message: '用户名必须是字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string

  @ApiProperty({ description: '密码', type: 'string' })
  @MinLength(6, { message: '密码长度不能小于6位' })
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string
}
