import { Injectable } from '@nestjs/common'

import type { CreateWebsocketDto } from './dto/create-websocket.dto'
import type { UpdateWebsocketDto } from './dto/update-websocket.dto'

@Injectable()
export class WebsocketService {
  create(createWebsocketDto: CreateWebsocketDto) {
    return 'This action adds a new websocket'
  }

  findAll() {
    return 'This action returns all websocket'
  }

  findOne(id: number) {
    return `This action returns a #${id} websocket`
  }

  update(id: number, updateWebsocketDto: UpdateWebsocketDto) {
    return `This action updates a #${id} websocket`
  }

  remove(id: number) {
    return `This action removes a #${id} websocket`
  }
}
