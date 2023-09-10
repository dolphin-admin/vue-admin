import { Injectable, Logger } from '@nestjs/common'
import { sep } from 'path'

import { FileEntity } from './entities'
import type { IUploadService } from './upload.interface'

@Injectable()
export class UploadService implements IUploadService {
  private readonly logger = new Logger(UploadService.name)

  uploadImage(file: Express.Multer.File): FileEntity {
    const { filename, mimetype, size, originalname } = file
    const path = file.path.replaceAll(sep, '/')
    this.logger.verbose(`已上传文件：${originalname} 至 ${path}`)
    return new FileEntity({
      path,
      filename,
      originalname,
      mimetype,
      size
    })
  }

  uploadImageBulk(files: Express.Multer.File[]): FileEntity[] {
    return files.map((file) => {
      const { filename, mimetype, size, originalname } = file
      const path = file.path.replaceAll(sep, '/')
      this.logger.verbose(`已上传文件：${originalname} 至 ${path}`)
      return new FileEntity({
        path,
        filename,
        originalname,
        mimetype,
        size
      })
    })
  }
}
