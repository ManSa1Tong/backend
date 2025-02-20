import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MapleService } from './maple.service';
import {
  ApiGetManyEventNotices,
  ApiGetEventNotice,
} from './dto/maple.controller';

@ApiTags('maple')
@Controller('maple')
export class MapleController {
  constructor(private mapleService: MapleService) {}

  @Get()
  @ApiGetManyEventNotices()
  async getManyEventNotice() {
    return await this.mapleService.fetchManyEventNotice();
  }

  @Get(':notice_id')
  @ApiGetEventNotice()
  async getEventNotice(@Param('notice_id', ParseIntPipe) notice_id: number) {
    return await this.mapleService.fetchEventNotice({ notice_id });
  }
}
