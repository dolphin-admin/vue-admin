import { ApiProperty } from '@nestjs/swagger'

export class UserEntity {
  @ApiProperty({ description: '用户 ID' })
  id: number

  @ApiProperty({ description: '用户名' })
  username: string

  @ApiProperty({ description: '密码' })
  password: string

  constructor(user: UserEntity) {
    this.id = user.id
    this.username = user.username
    this.password = user.password
  }
}
