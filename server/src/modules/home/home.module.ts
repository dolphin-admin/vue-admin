import { Module } from '@nestjs/common'

import { HomeController } from './home.controller'
import { IHomeService } from './home.interface'
import { HomeService } from './home.service'

@Module({
  controllers: [HomeController],
  providers: [
    {
      provide: IHomeService,
      useClass: HomeService
    }
  ]
})
export class HomeModule {}
