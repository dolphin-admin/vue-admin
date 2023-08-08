import { PartialType } from '@nestjs/swagger'

import { CreateDictionaryDto } from './create-dictionary.dto'

export class UpdateDictionaryDto extends PartialType(CreateDictionaryDto) {}
