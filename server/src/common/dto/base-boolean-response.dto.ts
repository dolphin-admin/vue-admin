import { ApiProperty, PickType } from '@nestjs/swagger'

import { BaseResponseDto } from './base-response.dto'

// NOTE: 仅用于 swagger
export class BaseBooleanResponseDto extends PickType(BaseResponseDto, [
  'code',
  'message'
] as const) {
  @ApiProperty({ description: '返回数据' })
  data?: boolean
}
