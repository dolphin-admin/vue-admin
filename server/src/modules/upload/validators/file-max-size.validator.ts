import { FileValidator } from '@nestjs/common'

import { CustomFileValidationError } from '../enum'

export class FileMaxSizeValidator extends FileValidator<{ maxSize: number }> {
  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    return file.size <= this.validationOptions.maxSize
  }

  buildErrorMessage(): string {
    return CustomFileValidationError.FILE_MAX_SIZE
  }
}
