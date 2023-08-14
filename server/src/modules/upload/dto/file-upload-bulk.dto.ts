import { ApiProperty } from '@nestjs/swagger'

export class FileUploadBulkDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary', description: '文件' },
    description: '文件列表'
  })
  readonly files: Express.Multer.File[]
}
