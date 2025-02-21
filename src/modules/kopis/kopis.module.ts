import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // ✅ HttpModule 추가
import { ConfigModule } from '@nestjs/config';
import { KopisService } from './kopis.service';
import { KopisController } from './kopis.controller';

@Module({
  imports: [HttpModule, ConfigModule], // ✅ HttpModule 등록
  controllers: [KopisController],
  providers: [KopisService],
  exports: [KopisService],
})
export class KopisModule {}
