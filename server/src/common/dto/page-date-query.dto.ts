import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsOptional } from 'class-validator'

import { PageQueryDto } from './page-query.dto'

export class PageDateQueryDto extends PageQueryDto {
  @ApiProperty({
    description: '开始时间',
    default: () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return yesterday.toISOString()
    }
  })
  @IsDate()
  @IsOptional()
  startTime?: Date

  @ApiProperty({ description: '结束时间', default: new Date().toISOString() })
  @IsDate()
  @IsOptional()
  endTime?: Date

  constructor(pageDateQueryDto: PageDateQueryDto) {
    super(pageDateQueryDto)
    this.startTime = pageDateQueryDto.startTime
    this.endTime = pageDateQueryDto.endTime
  }
}
