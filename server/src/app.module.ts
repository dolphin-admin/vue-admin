import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule
} from 'nestjs-i18n'
import { join } from 'path'

import { apiLogger } from '@/middlewares'
import {
  AuthModule,
  DictionariesModule,
  HomeModule,
  UploadModule,
  UsersModule,
  UserTrafficsModule,
  WebsocketModule
} from '@/modules'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    HomeModule,
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
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'zh_CN',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true
      },
      resolvers: [new HeaderResolver(['language']), AcceptLanguageResolver],
      typesOutputPath: join(__dirname, '../src/generated/i18n.generated.ts'),
      loader: I18nJsonLoader
    })
  ],
  controllers: [AppController],
  providers: [AppService, Logger]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(apiLogger).forRoutes('*')
  }
}
