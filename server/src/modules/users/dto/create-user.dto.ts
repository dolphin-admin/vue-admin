import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: '用户名'
  })
  username: string
}
