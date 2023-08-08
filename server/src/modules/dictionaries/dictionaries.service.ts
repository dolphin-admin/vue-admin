import { Injectable } from '@nestjs/common'

import type { CreateDictionaryDto } from './dto/create-dictionary.dto'
import type { UpdateDictionaryDto } from './dto/update-dictionary.dto'

@Injectable()
export class DictionariesService {
  create(createDictionaryDto: CreateDictionaryDto) {
    return 'This action adds a new dictionary'
  }

  findAll() {
    return 'This action returns all dictionaries'
  }

  findOne(id: number) {
    return `This action returns a #${id} dictionary`
  }

  update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
    return `This action updates a #${id} dictionary`
  }

  remove(id: number) {
    return `This action removes a #${id} dictionary`
  }
}
