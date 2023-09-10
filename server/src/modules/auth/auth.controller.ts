import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { ErrorResponseDto } from '@/common'

import { IAuthService } from './auth.interface'
import { AuthSignupDto, AuthUsernameLoginDto } from './dto'

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @ApiOperation({ summary: '注册' })
  @ApiOkResponse({ description: '注册成功', status: 200 })
  @ApiBadRequestResponse({ type: ErrorResponseDto, description: '输入有误' })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto, description: '授权失败' })
  @ApiConflictResponse({ type: ErrorResponseDto, description: '用户名已存在' })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() authSignupDto: AuthSignupDto) {
    return this.authService.signup(authSignupDto)
  }

  @ApiOperation({ summary: '登录' })
  @ApiOkResponse({ description: '登录成功' })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: '用户名或密码不正确'
  })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto, description: '授权失败' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginByUsername(@Body() authUsernameLoginDto: AuthUsernameLoginDto) {
    return this.authService.loginByUsername(authUsernameLoginDto)
  }
}
