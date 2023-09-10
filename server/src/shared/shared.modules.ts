import { Global, Module } from '@nestjs/common'

import { PrismaService } from './services'

@Global()
@Module({
  exports: [PrismaService]
})
export class SharedModule {}
