import type { FileEntity } from './entities'

export abstract class IUploadService {
  abstract uploadImage(file: Express.Multer.File): FileEntity
  abstract uploadImageBulk(files: Express.Multer.File[]): FileEntity[]
}
