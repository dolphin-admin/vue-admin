import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return '欢迎使用 Dolphin Admin 后台管理系统！'
  }
}
