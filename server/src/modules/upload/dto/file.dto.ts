import { ApiProperty } from '@nestjs/swagger'

export class FileDto {
  @ApiProperty({ type: 'string', description: '文件路径' })
  path: string

  @ApiProperty({ type: 'string', description: '文件名称' })
  filename: string

  @ApiProperty({ type: 'string', description: '文件类型' })
  mimetype: string

  @ApiProperty({ type: 'number', description: '文件大小' })
  size: number

  constructor(partial: Partial<FileDto>) {
    Object.assign(this, partial)
  }
}