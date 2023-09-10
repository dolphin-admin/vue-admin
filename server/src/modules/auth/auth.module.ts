import { Module } from '@nestjs/common'

import { PrismaService } from '@/shared/services'

import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { IAuthService } from './auth.interface'
import { AuthService } from './auth.service'

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService
    },
    PrismaService
  ]
})
export class AuthModule {}
