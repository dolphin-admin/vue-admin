import { ApiProperty } from '@nestjs/swagger'

import { BaseResponseDto } from './base-response.dto'

export class PaginatedDto<TData> extends BaseResponseDto {
  @ApiProperty({ description: '总条数' })
  total: number

  @ApiProperty({ description: '总页数' })
  page: number

  @ApiProperty({ description: '每页条数' })
  pageSize: number

  data: TData[]
}
