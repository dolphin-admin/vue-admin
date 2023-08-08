import { ApiProperty } from '@nestjs/swagger'

export class FileUploadBulkDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[]
}
