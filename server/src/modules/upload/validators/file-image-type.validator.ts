import { FileValidator } from '@nestjs/common'

import { CustomFileValidationError } from '../enum'

export class FileImageTypeValidator extends FileValidator<{
  fileType: RegExp
}> {
  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    return this.validationOptions.fileType.test(file.mimetype)
  }

  buildErrorMessage(): string {
    return CustomFileValidationError.FILE_IMAGE_TYPE
  }
}
