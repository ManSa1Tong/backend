import {
  Controller,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KopisService } from './kopis.service';
import { GetPerformancesDto } from './dto/get-performances.dto';
import { GetFestivalsDto } from './dto/get-festivals.dto';
import { GetPerformanceDetailDto } from './dto/get-performance-detail.dto';
import { GetPerformancesResponseDto } from './dto/get-performances-response.dto';
import { GetFestivalsResponseDto } from './dto/get-festivals-response.dto';
import { GetPerformanceDetailResponseDto } from './dto/get-performance-detail-response.dto';

@ApiTags('kopis')
@Controller('kopis')
export class KopisController {
  constructor(private readonly kopisService: KopisService) {}

  @Get('performances')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '공연 목록 조회',
    description: '특정 기간 동안의 공연 목록을 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '공연 목록을 성공적으로 반환함.',
    type: GetPerformancesResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      '잘못된 요청 파라미터 (예: 날짜 형식 오류, 최대 조회 개수 초과).',
  })
  @ApiResponse({ status: 404, description: '공연 데이터를 찾을 수 없음.' })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류 (API 키 누락 또는 KOPIS API 호출 실패).',
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '축제 목록 조회',
    description: '특정 기간 동안의 축제 목록을 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '축제 목록을 성공적으로 반환함.',
    type: GetFestivalsResponseDto,
  })
  @ApiResponse({
    status: 400,
    description:
      '잘못된 요청 파라미터 (예: 날짜 형식 오류, 최대 조회 개수 초과).',
  })
  @ApiResponse({ status: 404, description: '축제 데이터를 찾을 수 없음.' })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류 (API 키 누락 또는 KOPIS API 호출 실패).',
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '공연 상세 조회',
    description: '특정 공연 ID에 대한 상세 정보를 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '공연 상세 정보를 성공적으로 반환함.',
    type: GetPerformanceDetailResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 파라미터 (예: ID 누락, 형식 오류).',
  })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 공연 정보를 찾을 수 없음.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 내부 오류 (API 키 누락 또는 KOPIS API 호출 실패).',
  })
  async getPerformanceDetail(@Param() params: GetPerformanceDetailDto) {
    return this.kopisService.fetchPerformanceDetail(params.id);
  }
}
