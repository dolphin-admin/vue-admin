import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ description: '用户名' })
  readonly username: string
}
