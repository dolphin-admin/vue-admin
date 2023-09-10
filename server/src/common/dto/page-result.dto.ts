import { ApiProperty } from '@nestjs/swagger'

import { BaseResponseDto } from './base-response.dto'

export class PageResultDto<TData> extends BaseResponseDto<TData> {
  @ApiProperty({ description: '总数', default: 100 })
  total: number

  @ApiProperty({ description: '页码', default: 1 })
  page: number

  @ApiProperty({ description: '每页条数', default: 10 })
  pageSize: number

  constructor(options: PageResultDto<TData>) {
    super(options)
    this.total = options.total
    this.page = options.page
    this.pageSize = options.pageSize
  }
}
