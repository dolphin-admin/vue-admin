import { Injectable } from '@nestjs/common'

import type { FileUploadDto } from './dto/file-upload.dto'

@Injectable()
export class UploadService {
  upload(createUploadDto: FileUploadDto) {
    return 'This action adds a new upload'
  }

  uploadBulk(createUploadDto: FileUploadDto[]) {
    return 'This action adds a new upload'
  }
}
