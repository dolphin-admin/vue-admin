import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n'

import { BaseResponseDto, ErrorResponseDto, PageResultDto } from '@/common'
import { bootstrapLog } from '@/utils'

import { AppModule } from './app.module'
import { CustomLogger } from './custom.logger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    logger: new CustomLogger()
  })

  // 全局前缀 - 如果没有子域名，可以设置全局前置
  app.setGlobalPrefix('/api')

  // 启用版本控制
  app.enableVersioning({
    type: VersioningType.URI
  })

  // 启用 shutdown hooks
  app.enableShutdownHooks()

  // 全局过滤器
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false
    })
  )
  // 全局拦截器
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // 全局管道
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true, // 自动删除非 dto 中的属性
      transform: true, // 自动转换类型
      transformOptions: {
        enableImplicitConversion: true // 允许隐式转换
      },
      stopAtFirstError: true
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
    .setDescription(
      `<p>Dolphin Admin 后台管理系统的接口文档，基于 Nest.js。</p>
      <p>API Fox 线上地址：<a>https://dolphin-admin.apifox.cn/</a></p>`
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ErrorResponseDto, BaseResponseDto, PageResultDto]
  })

  /**
   * 文档地址为 /api
   * 例如：http://localhost:3000/api/docs
   * Swagger JSON 地址为 /api-json
   * 例如：http://localhost:3000/api/docs-json
   */
  SwaggerModule.setup('api/docs', app, document)

  const configService = app.get(ConfigService)
  const port = +configService.get('PORT') || 3000
  await app.listen(port)

  // 启动动画、日志
  bootstrapLog(port)
}
bootstrap()
