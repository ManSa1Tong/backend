import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KopisService } from './kopis.service';
import { GetPerformancesDto } from './dto/get-performances.dto';
import { GetFestivalsDto } from './dto/get-festivals.dto';
import { GetPerformanceDetailDto } from './dto/get-performance-detail.dto';
import { GetPerformancesResponseDto } from './dto/get-performances-response.dto';
import { GetFestivalsResponseDto } from './dto/get-festivals-response.dto';
import { GetPerformanceDetailResponseDto } from './dto/get-performance-detail-response.dto';
import {
  ApiResponseSuccess,
  ApiResponseError,
  ApiOperationSummary,
} from 'src/decorators/swagger-response.decorator';

@ApiTags('kopis')
@Controller('kopis')
export class KopisController {
  constructor(private readonly kopisService: KopisService) {}

  @Get('performances')
  @ApiOperationSummary(
    '공연 목록 조회',
    '특정 기간 동안의 공연 목록을 가져옵니다.',
  )
  @ApiResponseSuccess(
    '공연 목록을 성공적으로 반환함.',
    GetPerformancesResponseDto,
  )
  @ApiResponseError(
    '잘못된 요청 파라미터 (예: 날짜 형식 오류, 최대 조회 개수 초과).',
    400,
  )
  @ApiResponseError('공연 데이터를 찾을 수 없음.', 404)
  @ApiResponseError(
    '서버 내부 오류 (API 키 누락 또는 KOPIS API 호출 실패).',
    500,
  )
  async getManyPerformances(@Query() query: GetPerformancesDto) {
    const result = await this.kopisService.fetchManyPerformances(
      query.startDate,
      query.endDate,
      query.page,
      query.rows,
    );
    return { performances: result };
  }

  @Get('festivals')
  @ApiOperationSummary(
    '축제 목록 조회',
    '특정 기간 동안의 축제 목록을 가져옵니다.',
  )
  @ApiResponseSuccess('축제 목록을 성공적으로 반환함.', GetFestivalsResponseDto)
  @ApiResponseError(
    '잘못된 요청 파라미터 (예: 날짜 형식 오류, 최대 조회 개수 초과).',
    400,
  )
  @ApiResponseError('축제 데이터를 찾을 수 없음.', 404)
  @ApiResponseError(
    '서버 내부 오류 (API 키 누락 또는 KOPIS API 호출 실패).',
    500,
  )
  async getManyFestivals(@Query() query: GetFestivalsDto) {
    const result = await this.kopisService.fetchManyFestivals(
      query.startDate,
      query.endDate,
      query.page,
      query.rows,
    );
    return { festivals: result };
  }

  @Get('performances/:id')
  @ApiOperationSummary(
    '공연/축제 상세 조회',
    '특정 공연/축제 ID에 대한 상세 정보를 가져옵니다.',
  )
  @ApiResponseSuccess(
    '공연/축제 상세 정보를 성공적으로 반환함.',
    GetPerformanceDetailResponseDto,
  )
  @ApiResponseError('잘못된 요청 파라미터 (예: ID 누락, 형식 오류).', 400)
  @ApiResponseError('해당 ID의 공연 정보를 찾을 수 없음.', 404)
  @ApiResponseError(
    '서버 내부 오류 (API 키 누락 또는 KOPIS API 호출 실패).',
    500,
  )
  async getPerformanceDetail(@Param() params: GetPerformanceDetailDto) {
    return this.kopisService.fetchPerformanceDetail(params.id);
  }
}
