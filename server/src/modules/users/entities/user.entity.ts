import { ApiProperty } from '@nestjs/swagger'

export class User {
  @ApiProperty({ description: '用户 ID' })
  id: number

  @ApiProperty({ description: '用户名' })
  username: string

  @ApiProperty({ description: '密码' })
  password: string
}
