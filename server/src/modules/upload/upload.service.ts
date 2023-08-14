import { Injectable, Logger } from '@nestjs/common'
import { sep } from 'path'

import { File } from './entities'
import type { IUploadService } from './upload.interface'

@Injectable()
export class UploadService implements IUploadService {
  private readonly logger = new Logger(UploadService.name)

  uploadImage(file: Express.Multer.File): File {
    const { filename, mimetype, size, originalname } = file
    const path = file.path.replaceAll(sep, '/')
    this.logger.verbose(`已上传文件：${originalname} 至 ${path}`)
    return new File({
      path,
      filename,
      originalname,
      mimetype,
      size
    })
  }

  uploadImageBulk(files: Express.Multer.File[]): File[] {
    return files.map((file) => {
      const { filename, mimetype, size, originalname } = file
      const path = file.path.replaceAll(sep, '/')
      this.logger.verbose(`已上传文件：${originalname} 至 ${path}`)
      return new File({
        path,
        filename,
        originalname,
        mimetype,
        size
      })
    })
  }
}
