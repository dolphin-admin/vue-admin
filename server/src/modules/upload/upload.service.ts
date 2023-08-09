import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {
  uploadImage(file: Express.Multer.File) {
    return file
  }

  uploadImageBulk(files: Express.Multer.File[]) {
    return files
  }
}
