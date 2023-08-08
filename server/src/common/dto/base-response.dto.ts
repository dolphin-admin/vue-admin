import { ApiProperty } from '@nestjs/swagger'

export class BaseResponseDto {
  @ApiProperty({ description: '总条数' })
  message?: string

  @ApiProperty({ description: '业务代码' })
  code?: number
}
