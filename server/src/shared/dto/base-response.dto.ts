import { Injectable } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

@Injectable()
export class BaseResponseDto {
  @ApiProperty({ description: '返回信息' })
  message?: string

  @ApiProperty({ description: '业务代码' })
  code?: number
}
