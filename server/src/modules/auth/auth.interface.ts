import type { AuthSignupDto, AuthUsernameLoginDto } from './dto'

export abstract class IAuthService {
  abstract signup(authSignupDto: AuthSignupDto): any
  abstract loginByUsername(authUsernameLoginDto: AuthUsernameLoginDto): any
}
