import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/shared/services/prisma/prisma.service'

import type { IAuthService } from './auth.interface'
import type { AuthSignupDto, AuthUsernameLoginDto } from './dto'

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly prismaService: PrismaService) {}

  signup(authSignupDto: AuthSignupDto) {
    return 'Signup'
  }

  loginByUsername(authUsernameLoginDto: AuthUsernameLoginDto) {
    return 'Login'
  }
}
