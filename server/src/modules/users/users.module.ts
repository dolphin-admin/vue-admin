import { Module } from '@nestjs/common'

import { PrismaService } from '@/shared/services'

import { UsersController } from './users.controller'
import { IUsersService } from './users.interface'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  exports: [IUsersService],
  providers: [
    {
      provide: IUsersService,
      useClass: UsersService
    },
    PrismaService
  ]
})
export class UsersModule {}
