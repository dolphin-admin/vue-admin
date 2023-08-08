import { Module } from '@nestjs/common'

import { DictionariesController } from './dictionaries.controller'
import { DictionariesService } from './dictionaries.service'

@Module({
  controllers: [DictionariesController],
  providers: [DictionariesService]
})
export class DictionariesModule {}
