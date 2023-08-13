import { ApiProperty } from '@nestjs/swagger'

export class BaseBooleanResponseDto {
  @ApiProperty({ description: '返回信息' })
  message?: string

  @ApiProperty({ description: '业务代码' })
  code?: number

  @ApiProperty({ description: '返回数据' })
  data?: boolean

  constructor(options: Partial<BaseBooleanResponseDto>) {
    Object.assign(this, options)
  }
}
