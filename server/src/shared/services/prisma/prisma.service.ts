import { Injectable, type OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * NOTE: 使用 OnModuleInit 来确保在应用程序启动时连接到数据库
   * 不使用 OnModuleInit 将进入懒加载模式，PrismaClient 将在第一次使用时连接到数据库
   */
  async onModuleInit() {
    await this.$connect()
  }
}
