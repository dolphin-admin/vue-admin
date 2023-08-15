import { ApiProperty, PickType } from '@nestjs/swagger'

import { BaseResponseDto } from './base-response.dto'

// NOTE: 仅用于 swagger
export class BaseStringResponseDto extends PickType(BaseResponseDto, [
  'code',
  'message'
]) {
  @ApiProperty({ description: '返回数据' })
  data?: string
}
