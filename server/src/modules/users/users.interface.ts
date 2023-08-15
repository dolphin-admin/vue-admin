import type { UserEntity } from './entities'

export abstract class IUsersService {
  abstract create(createUserDto: any): any
  abstract findAll(): any
  abstract findOneById(id: number): Promise<UserEntity | null>
  abstract findOneByUsername(username: string): Promise<UserEntity | null>
  abstract update(id: number, updateUserDto: any): any
  abstract remove(id: number): any
}
