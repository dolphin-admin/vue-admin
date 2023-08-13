import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { BaseResponseDto } from '@/common'

import { HomeService } from './home.service'

@ApiTags('主站')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiOperation({ summary: '首页' })
  @ApiOkResponse({ type: BaseResponseDto<string> })
  @Get()
  getHello(): BaseResponseDto<string> {
    return new BaseResponseDto({ data: this.homeService.getHello() })
  }
}
