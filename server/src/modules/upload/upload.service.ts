import { Injectable } from '@nestjs/common'
import path from 'path'

import { FileDto } from './dto'
import type { IUploadService } from './upload.interface'

@Injectable()
export class UploadService implements IUploadService {
  uploadImage(file: Express.Multer.File): FileDto {
    return new FileDto({
      path: file.path.replaceAll(path.sep, '/'),
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size
    })
  }

  uploadImageBulk(files: Express.Multer.File[]): FileDto[] {
    return files.map(
      (file) =>
        new FileDto({
          path: file.path.replaceAll(path.sep, '/'),
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size
        })
    )
  }
}
