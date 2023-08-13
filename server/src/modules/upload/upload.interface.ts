import type { FileDto } from './dto'

export abstract class IUploadService {
  abstract uploadImage(file: Express.Multer.File): FileDto
  abstract uploadImageBulk(files: Express.Multer.File[]): FileDto[]
}
