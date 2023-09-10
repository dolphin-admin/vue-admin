import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'

import { ErrorResponseDto, PageDateQueryDto } from '@/common'
import { ApiPageOkResponse } from '@/decorators'

import { CreateUserDto, UpdateUserDto } from './dto'
import { UserEntity } from './entities/user.entity'
import { IUsersService } from './users.interface'

@ApiTags('用户')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @ApiOperation({ summary: '创建用户' })
  @ApiCreatedResponse({ type: UserEntity, description: '创建成功' })
  @ApiBadRequestResponse({ type: ErrorResponseDto, description: '数据错误' })
  @ApiConflictResponse({ type: ErrorResponseDto, description: '用户已存在' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiOperation({ summary: '用户列表' })
  @ApiPageOkResponse(UserEntity)
  @ApiQuery({ name: 'page', type: 'number', required: false, example: 1 })
  @Get()
  async findAll(@Query() pageDateQueryDto: PageDateQueryDto) {
    return this.usersService.findAll(pageDateQueryDto)
  }

  @ApiOperation({ summary: '用户详情' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOneById(id)
  }

  @ApiOperation({ summary: '修改用户' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: '删除用户' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id)
  }
}
