import { ApiProperty } from '@nestjs/swagger'

import { ErrorResponseDto } from './error-response.dto'

export class BaseResponseDto<TData> extends ErrorResponseDto {
  @ApiProperty({ description: '返回数据' })
  data?: TData

  constructor(baseResponseDto: BaseResponseDto<TData>) {
    super(baseResponseDto)
    this.data = baseResponseDto.data
  }
}
