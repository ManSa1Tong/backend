import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MapleService } from './maple.service';
import { ApiGetMapleEventNotices } from './dto/maple.controller';

@ApiTags('maple')
@Controller('maple')
export class MapleController {
  constructor(private mapleService: MapleService) {}

  @Get()
  @ApiGetMapleEventNotices()
  async getMapleEventNotices() {
    return await this.mapleService.fetchManyEventNotice();
  }
}
