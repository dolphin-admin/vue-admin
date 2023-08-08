import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'

import { FileUploadDto } from './dto/file-upload.dto'
import { FileUploadBulkDto } from './dto/file-upload-bulk.dto'
import { UploadService } from './upload.service'

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传的文件',
    type: FileUploadDto
  })
  upload(@UploadedFile() file: any) {
    return this.uploadService.upload(file)
  }

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '批量上传的文件列表',
    type: FileUploadBulkDto
  })
  uploadBulk(@UploadedFile() files: any[]) {
    return this.uploadService.uploadBulk(files)
  }
}
