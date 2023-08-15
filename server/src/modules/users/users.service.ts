import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/shared/services'

import type { CreateUserDto, UpdateUserDto } from './dto'
import { UserEntity } from './entities'
import type { IUsersService } from './users.interface'

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return {}
  }

  async findAll() {
    return 'This action returns all users'
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id
      }
    })
    if (!user) {
      throw new NotFoundException('用户未找到')
    }
    return new UserEntity(user)
  }

  async findOneByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username
      }
    })
    if (!user) {
      return null
    }
    return new UserEntity(user)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
