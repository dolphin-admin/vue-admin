import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponseDto {
  @ApiProperty({ description: '返回信息' })
  message?: string

  @ApiProperty({ description: '业务代码' })
  code?: number

  constructor(options: ErrorResponseDto) {
    this.message = options.message
    this.code = options.code
  }
}
