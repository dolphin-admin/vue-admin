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

import { DictionariesService } from './dictionaries.service'
import { CreateDictionaryDto } from './dto/create-dictionary.dto'
import { UpdateDictionaryDto } from './dto/update-dictionary.dto'

@ApiTags('数据字典')
@Controller('dictionaries')
export class DictionariesController {
  constructor(private readonly dictionariesService: DictionariesService) {}

  @Post()
  create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionariesService.create(createDictionaryDto)
  }

  @Get()
  findAll() {
    return this.dictionariesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dictionariesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDictionaryDto: UpdateDictionaryDto
  ) {
    return this.dictionariesService.update(+id, updateDictionaryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dictionariesService.remove(+id)
  }
}
