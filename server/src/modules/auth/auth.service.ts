import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/shared/services/prisma/prisma.service'

import { IUsersService } from '../users/users.interface'
import type { IAuthService } from './auth.interface'
import type { AuthSignupDto, AuthUsernameLoginDto } from './dto'

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: IUsersService
  ) {}

  signup(authSignupDto: AuthSignupDto) {
    return 'Signup'
  }

  loginByUsername(authUsernameLoginDto: AuthUsernameLoginDto) {
    const { username, password } = authUsernameLoginDto
    const user = this.userService.findOneByUsername(username)
    return user
  }
}
