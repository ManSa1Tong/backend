import { Module } from '@nestjs/common';
import { MapleController } from './maple.controller';
import { MapleService } from './maple.service';

@Module({
  controllers: [MapleController],
  providers: [MapleService],
})
export class MapleModule {}
