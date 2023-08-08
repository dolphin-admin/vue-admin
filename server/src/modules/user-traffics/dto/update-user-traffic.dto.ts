import { PartialType } from '@nestjs/swagger'

import { CreateUserTrafficDto } from './create-user-traffic.dto'

export class UpdateUserTrafficDto extends PartialType(CreateUserTrafficDto) {}
