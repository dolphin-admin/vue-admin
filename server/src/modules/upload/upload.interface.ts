import type { File } from './entities'

export abstract class IUploadService {
  abstract uploadImage(file: Express.Multer.File): File
  abstract uploadImageBulk(files: Express.Multer.File[]): File[]
}
