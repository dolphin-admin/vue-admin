import type { User } from './entities'

export abstract class IUserService {
  abstract create(createUserDto: any): any
  abstract findAll(): any
  abstract findOne(id: number): any
  abstract update(id: number, updateUserDto: any): any
  abstract remove(id: number): any
  abstract alreadyExists(username: string): User
}
