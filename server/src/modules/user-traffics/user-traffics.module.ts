import { Module } from '@nestjs/common'

import { UserTrafficsController } from './user-traffics.controller'
import { UserTrafficsService } from './user-traffics.service'

@Module({
  controllers: [UserTrafficsController],
  providers: [UserTrafficsService]
})
export class UserTrafficsModule {}
