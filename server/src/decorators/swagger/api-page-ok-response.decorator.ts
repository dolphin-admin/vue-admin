import type { Type } from '@nestjs/common'
import { applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { PageResponseDto } from '@/common'

export const ApiPageOkResponse = <TModel extends Type<any>>(model: TModel) =>
  applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `${model.name}PageResponse`,
        allOf: [
          { $ref: getSchemaPath(PageResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) }
              }
            }
          }
        ]
      }
    })
  )
