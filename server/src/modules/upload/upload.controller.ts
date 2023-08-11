import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { FileUploadBulkDto, FileUploadDto } from './dto'
import { UploadService } from './upload.service'

@ApiTags('文件')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传的文件',
    type: FileUploadDto
  })
  @ApiOkResponse({ description: '上传成功' })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5,
          message: '文件大小不能超过 5MB'
        })
        .addFileTypeValidator({
          fileType: /image\/(jpeg|png|jpg)$/
        })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    return this.uploadService.uploadImage(file)
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '批量上传的文件列表',
    type: FileUploadBulkDto
  })
  @ApiOkResponse({ description: '批量上传成功' })
  @UseInterceptors(FilesInterceptor('files'))
  @Post('bulk')
  uploadImageBulk(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5,
          message: '文件大小不能超过 5MB'
        })
        .addFileTypeValidator({
          fileType: /image\/(jpeg|png|jpg)$/
        })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    files: Express.Multer.File[]
  ) {
    return this.uploadService.uploadImageBulk(files)
  }

  @ApiOkResponse({ description: '获取文件' })
  @Get(':path')
  getUploadedFile(@Param('path') path: string, @Res() res: any) {
    return res.sendFile(path, { root: 'storage' })
  }
}
