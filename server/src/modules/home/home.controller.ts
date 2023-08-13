import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { BaseStringResponseDto } from '@/common'

import { IHomeService } from './home.interface'

@ApiTags('主站')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: IHomeService) {}

  @ApiOperation({ summary: '首页' })
  @ApiOkResponse({ type: BaseStringResponseDto })
  @Get()
  getHello(): BaseStringResponseDto {
    return new BaseStringResponseDto({ data: this.homeService.getHello() })
  }

  @ApiOperation({ summary: '版本' })
  @ApiOkResponse({ type: BaseStringResponseDto })
  @Get('version')
  getVersion(): BaseStringResponseDto {
    return new BaseStringResponseDto({ data: this.homeService.getVersion() })
  }
}
