import { Module } from '@nestjs/common'

import { PrismaService } from '@/shared/services'

import { AuthController } from './auth.controller'
import { IAuthService } from './auth.interface'
import { AuthService } from './auth.service'

@Module({
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
