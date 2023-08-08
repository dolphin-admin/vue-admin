import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { DictionariesModule } from './modules/dictionaries/dictionaries.module'
import { UploadModule } from './modules/upload/upload.module'
import { UserTrafficsModule } from './modules/user-traffics/user-traffics.module'
import { UsersModule } from './modules/users/users.module'
import { WebsocketModule } from './modules/websocket/websocket.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    UploadModule,
    DictionariesModule,
    UserTrafficsModule,
    WebsocketModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
