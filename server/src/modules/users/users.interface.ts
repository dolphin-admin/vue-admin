import type { PageDateQueryDto } from '../../common/dto/page-date-query.dto'
import type { UserEntity } from './entities'

export abstract class IUsersService {
  abstract create(createUserDto: any): any
  abstract findAll(pageDateQueryDto: PageDateQueryDto): any
  abstract findOneById(id: number): Promise<UserEntity | null>
  abstract findOneByUsername(username: string): Promise<UserEntity | null>
  abstract update(id: number, updateUserDto: any): any
  abstract remove(id: number): any
  abstract findCurrent(): Promise<UserEntity | null>
  abstract enableOne(id: number): any
  abstract disableOne(id: number): any
  abstract updatePassword(id: number): any
  abstract resetPassword(id: number): any
}
