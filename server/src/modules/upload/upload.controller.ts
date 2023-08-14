import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'
import { Response } from 'express'

import { ErrorResponseDto } from '@/common'

import {
  MAX_UPLOAD_FILE_SIZE,
  MAX_UPLOAD_FILES_COUNT,
  STORAGE_DIR
} from './constants'
import { FileUploadBulkDto, FileUploadDto } from './dto'
import { File } from './entities'
import { CustomFileValidationError } from './enum'
import { IUploadService } from './upload.interface'
import {
  FileImageTypeValidator,
  FileMaxSizeValidator,
  FileRequiredValidator
} from './validators'

// 上传文件错误处理
const handleUploadError = (error: string) => {
  switch (error) {
    case CustomFileValidationError.FILE_REQUIRED:
      throw new BadRequestException('文件不能为空')
    case CustomFileValidationError.FILE_MAX_SIZE:
      throw new BadRequestException(
        `文件大小不能超过 ${MAX_UPLOAD_FILE_SIZE / 1024 / 1024}MB`
      )
    case CustomFileValidationError.FILE_IMAGE_TYPE:
      throw new BadRequestException(
        '文件类型错误，仅支持图片格式为 png、jpg、jpeg'
      )
    default:
      throw new BadRequestException('上传文件失败')
  }
}

@ApiTags('文件上传')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: IUploadService) {}

  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传的文件',
    type: FileUploadDto
  })
  @ApiCreatedResponse({ type: File, description: '上传成功' })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: '文件为空'
  })
  @ApiUnprocessableEntityResponse({
    type: ErrorResponseDto,
    description: '文件大小大于 5MB | 文件类型非 png、jpg、jpeg'
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  public uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(new FileRequiredValidator({ isRequired: true }))
        .addValidator(
          new FileImageTypeValidator({ fileType: /image\/(jpeg|png|jpg)$/ })
        )
        .addValidator(
          new FileMaxSizeValidator({ maxSize: MAX_UPLOAD_FILE_SIZE })
        )
        .build({
          fileIsRequired: true,
          exceptionFactory: handleUploadError
        })
    )
    file: Express.Multer.File
  ) {
    return this.uploadService.uploadImage(file)
  }

  @ApiOperation({ summary: '批量上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '批量上传的文件列表',
    type: FileUploadBulkDto
  })
  @ApiCreatedResponse({ type: [File], description: '批量上传成功' })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: '文件为空、文件大小大于 5MB'
  })
  @ApiUnprocessableEntityResponse({
    type: ErrorResponseDto,
    description: '文件大小大于 5MB | 文件类型非 png、jpg、jpeg'
  })
  @UseInterceptors(FilesInterceptor('files', MAX_UPLOAD_FILES_COUNT))
  @Post('bulk')
  public uploadImageBulk(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addValidator(new FileRequiredValidator({ isRequired: true }))
        .addValidator(
          new FileImageTypeValidator({ fileType: /image\/(jpeg|png|jpg)$/ })
        )
        .addValidator(
          new FileMaxSizeValidator({ maxSize: MAX_UPLOAD_FILE_SIZE })
        )
        .build({
          fileIsRequired: true,
          exceptionFactory: handleUploadError
        })
    )
    files: Express.Multer.File[]
  ) {
    return this.uploadService.uploadImageBulk(files)
  }

  @ApiOperation({ summary: '获取文件' })
  @ApiOkResponse()
  @Get(':path')
  public getUploadedFile(@Param('path') path: string, @Res() res: Response) {
    return res.sendFile(path, { root: STORAGE_DIR })
  }

  @ApiOperation({ summary: '下载文件' })
  @ApiOkResponse({ description: '下载成功' })
  @Get('download/:path')
  public downloadFile(@Param('path') path: string, @Res() res: Response) {
    return res.download(`${STORAGE_DIR}/${path}`)
  }
}
