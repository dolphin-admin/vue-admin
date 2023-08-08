import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { PaginatedDto } from '@/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false
  })

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Dolphin Admin API')
    .setDescription('Dolphin Admin 后台管理系统的接口文档，基于 Nest.js。')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedDto]
  })

  /**
   * 文档地址为 /api
   * 例如：http://localhost:3000/api
   * Swagger JSON 地址为 /api-json
   * 例如：http://localhost:3000/api-json
   */
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
