import { Injectable } from '@nestjs/common'
import path from 'path'

import { FileDto } from './dto'

@Injectable()
export class UploadService {
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
