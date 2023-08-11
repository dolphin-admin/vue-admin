import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

import { uuid } from '@/utils'

import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 文件存储路径 TODO: 考虑使用配置文件
        destination: 'storage',
        filename: (_, file, callback) =>
          callback(null, `${uuid() + extname(file.originalname)}`)
      }),
      limits: {
        // TODO: 考虑使用配置文件
        fileSize: 1024 * 1024 * 10 // 10MB
      },
      fileFilter: (req, file, callback) => {}
    })
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
