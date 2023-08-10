import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import {
  AuthModule,
  DictionariesModule,
  UploadModule,
  UsersModule,
  UserTrafficsModule,
  WebsocketModule
} from '@/modules'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    UploadModule,
    DictionariesModule,
    UserTrafficsModule,
    WebsocketModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)']
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
