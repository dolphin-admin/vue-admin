import { Module } from '@nestjs/common'

import { WebsocketGateway } from './websocket.gateway'
import { WebsocketService } from './websocket.service'

@Module({
  providers: [WebsocketGateway, WebsocketService]
})
export class WebsocketModule {}
