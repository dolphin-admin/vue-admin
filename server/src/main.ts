import type { LogLevel } from '@nestjs/common'
import { VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n'
import { stdout } from 'process'

import { BaseResponseDto, ErrorResponseDto, PageResponseDto } from '@/common'

import { AppModule } from './app.module'

async function bootstrap() {
  // 日志
  const logLevels: LogLevel[] =
    process.env.NODE_ENV === 'production'
      ? ['error', 'warn', 'log']
      : ['error', 'warn', 'log', 'verbose', 'debug']

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    logger: logLevels
  })

  app.setGlobalPrefix('') // 全局前缀

  app.enableVersioning({
    type: VersioningType.URI
  }) // 启用版本控制

  // 全局管道
  // app.useGlobalPipes(new ValidationPipe())
  app.useGlobalPipes(new I18nValidationPipe())

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false
    })
  )

  /**
   * 静态资源
   * 用作上传文件的存储目录
   * 例如：http://localhost:3000/storage/xxx.png
   */
  app.useStaticAssets('storage', {
    prefix: '/storage'
  })

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Dolphin Admin API')
    .setDescription('Dolphin Admin 后台管理系统的接口文档，基于 Nest.js。')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ErrorResponseDto, BaseResponseDto, PageResponseDto]
  })

  /**
   * 文档地址为 /api
   * 例如：http://localhost:3000/api
   * Swagger JSON 地址为 /api-json
   * 例如：http://localhost:3000/api-json
   */
  SwaggerModule.setup('api', app, document)

  const configService = app.get(ConfigService)
  const port = +configService.get('PORT') || 3000
  await app.listen(port)

  stdout.write(`Server is running on http://localhost:${port}\n`)
  stdout.write(`Documentation is available at http://localhost:${port}/api`)
}
bootstrap()
