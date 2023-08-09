import { ApiProperty } from '@nestjs/swagger'
import type { Express } from 'express'

export class FileUploadBulkDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' }
  })
  files: Express.Multer.File[]
}
