import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { BaseResponseDto } from '@/common'

import { HomeService } from './home.service'

@ApiTags('主站')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiOkResponse({ type: BaseResponseDto<string> })
  @Get()
  getHello(): BaseResponseDto<string> {
    return new BaseResponseDto({ data: this.homeService.getHello() })
  }
}
