import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MapleService } from './maple.service';
import {
  ApiResponseSuccess,
  ApiResponseError,
  ApiOperationSummary,
} from 'src/decorators/swagger-response.decorator';
import { EventNoticeListDto } from './dto/event_notice_list.dto';
import { EventNoticeDto } from './dto/event_notice.dto';

@ApiTags('maple')
@Controller('maple')
export class MapleController {
  constructor(private mapleService: MapleService) {}

  @Get()
  @ApiOperationSummary(
    '메이플스토리 진행중 이벤트 목록 조회',
    '진행중인 이벤트 목록 20개를 가지고 옵니다.',
  )
  @ApiResponseSuccess('메이플스토리 진행중 이벤트 목록 조회 성공', [
    EventNoticeListDto,
  ])
  @ApiResponseError('Too Many Requests', 429)
  @ApiResponseError('서버 오류', 500)
  async getManyEventNotice() {
    return await this.mapleService.fetchManyEventNotice();
  }

  @Get(':notice_id')
  @ApiOperationSummary(
    '메이플스토리 진행중 이벤트 상세 조회',
    '메이플스토리 진행 중 이벤트 게시글 세부 사항을 조회합니다.',
  )
  @ApiResponseSuccess(
    '메이플스토리 진행중 이벤트 게시글 세부 사항 조회 성공',
    EventNoticeDto,
  )
  @ApiResponseError('Too Many Requests', 429)
  @ApiResponseError('서버 오류', 500)
  async getEventNotice(@Param('notice_id', ParseIntPipe) notice_id: number) {
    return await this.mapleService.fetchEventNotice({ notice_id });
  }
}
