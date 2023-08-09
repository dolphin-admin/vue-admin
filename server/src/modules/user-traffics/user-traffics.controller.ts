import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateUserTrafficDto } from './dto/create-user-traffic.dto'
import { UpdateUserTrafficDto } from './dto/update-user-traffic.dto'
import { UserTrafficsService } from './user-traffics.service'

@ApiTags('用户流量')
@Controller('user-traffics')
export class UserTrafficsController {
  constructor(private readonly userTrafficsService: UserTrafficsService) {}

  @Post()
  create(@Body() createUserTrafficDto: CreateUserTrafficDto) {
    return this.userTrafficsService.create(createUserTrafficDto)
  }

  @Get()
  findAll() {
    return this.userTrafficsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTrafficsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTrafficDto: UpdateUserTrafficDto
  ) {
    return this.userTrafficsService.update(+id, updateUserTrafficDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTrafficsService.remove(+id)
  }
}
