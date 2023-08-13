import { ApiProperty } from '@nestjs/swagger'

// NOTE: 仅用于 swagger
export class BaseStringResponseDto {
  @ApiProperty({ description: '返回信息' })
  message?: string

  @ApiProperty({ description: '业务代码' })
  code?: number

  @ApiProperty({ description: '返回数据' })
  data?: string

  constructor(options: Partial<BaseStringResponseDto>) {
    Object.assign(this, options)
  }
}
