import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements Partial<User> {
  @ApiProperty({ description: '用户 ID' })
  id: number

  @ApiProperty({ description: '用户名' })
  username: string

  @ApiProperty({ description: '密码' })
  @ApiHideProperty()
  @Exclude()
  password: string

  @ApiProperty({ description: '名', nullable: true })
  firstName: string | null

  @ApiProperty({ description: '姓', nullable: true })
  lastName: string | null

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  constructor(userEntity: Partial<UserEntity>) {
    Object.assign(this, userEntity)
  }
}
