import { FileValidator } from '@nestjs/common'

import { CustomFileValidationError } from '../enum'

export class FileRequiredValidator extends FileValidator<{
  isRequired: boolean
}> {
  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    return this.validationOptions.isRequired ? !!file : true
  }

  buildErrorMessage() {
    return CustomFileValidationError.FILE_REQUIRED
  }
}
