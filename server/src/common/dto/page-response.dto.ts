import { ApiProperty } from '@nestjs/swagger'

import { BaseResponseDto } from './base-response.dto'

export class PageResponseDto<TData> extends BaseResponseDto<TData> {
  @ApiProperty({ description: '总条数' })
  total: number

  @ApiProperty({ description: '总页数' })
  page: number

  @ApiProperty({ description: '每页条数' })
  pageSize: number

  constructor(options: PageResponseDto<TData>) {
    super(options)
    this.total = options.total
    this.page = options.page
    this.pageSize = options.pageSize
  }
}
