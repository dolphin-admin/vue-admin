import { PartialType } from '@nestjs/mapped-types'

import { CreateWebsocketDto } from './create-websocket.dto'

export class UpdateWebsocketDto extends PartialType(CreateWebsocketDto) {
  id: number
}
