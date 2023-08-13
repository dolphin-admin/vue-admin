import type { Type } from '@nestjs/common'
import { applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { BaseResponseDto } from '@/common'

export const ApiOkObjectResponse = <TModel extends Type<any>>(model: TModel) =>
  applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(BaseResponseDto),
        properties: {
          data: {
            type: 'object',
            $ref: getSchemaPath(model)
          }
        }
      }
    })
  )
