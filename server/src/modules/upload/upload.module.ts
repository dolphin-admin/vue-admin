import { Module, UnprocessableEntityException } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

import { fileExtensionMap } from '@/shared'
import { uuid } from '@/utils'

import { MAX_UPLOAD_FILE_SIZE, STORAGE_DIR } from './constants'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
  imports: [
    /**
     * TODO: 考虑使用配置文件
     * - 文件存储路径
     * - 文件大小限制
     */
    MulterModule.register({
      storage: diskStorage({
        destination: STORAGE_DIR,
        filename: (_, file, callback) =>
          callback(null, `${uuid() + extname(file.originalname)}`)
      }),
      limits: {
        fileSize: MAX_UPLOAD_FILE_SIZE
      },
      fileFilter: (_req, file, callback) => {
        if (fileExtensionMap.get(file.mimetype)) {
          callback(null, true)
        } else {
          callback(
            new UnprocessableEntityException('无法处理的文件类型'),
            false
          )
        }
      }
    })
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
