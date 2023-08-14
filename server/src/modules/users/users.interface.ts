import type { UserEntity } from './entities'

export abstract class IUsersService {
  abstract create(createUserDto: any): any
  abstract findAll(): any
  abstract findOneById(id: number): Promise<UserEntity>
  abstract findOneByUsername(username: string): Promise<UserEntity>
  abstract update(id: number, updateUserDto: any): any
  abstract remove(id: number): any
}
