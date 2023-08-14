import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'

import { ErrorResponseDto } from '@/common'
import { ApiPageOkResponse } from '@/decorators'

import { CreateUserDto, UpdateUserDto } from './dto'
import { UserEntity } from './entities/user.entity'
import { IUsersService } from './users.interface'

@ApiTags('用户')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity, description: '创建成功' })
  @ApiBadRequestResponse({ type: ErrorResponseDto, description: '数据错误' })
  @ApiConflictResponse({ type: ErrorResponseDto, description: '用户已存在' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiPageOkResponse(UserEntity)
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id)
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
