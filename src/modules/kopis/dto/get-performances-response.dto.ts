import { ApiProperty } from '@nestjs/swagger';

class PerformanceDto {
  @ApiProperty({ description: '공연 ID', example: 'PF257050' })
  mt20id: string;

  @ApiProperty({
    description: '공연명',
    example: 'Dreamcatcher World Tour: Luck Inside 7 Doors [서울]',
  })
  prfnm: string;

  @ApiProperty({ description: '공연 시작일', example: '2024.01.13' })
  prfpdfrom: string;

  @ApiProperty({ description: '공연 종료일', example: '2024.01.13' })
  prfpdto: string;

  @ApiProperty({
    description: '공연 시설명',
    example: '예스24 라이브홀 (구. 악스코리아)',
  })
  fcltynm: string;

  @ApiProperty({
    description: '포스터 이미지 URL',
    example:
      'http://www.kopis.or.kr/upload/pfmPoster/PF_PF257050_250110_152623.jpg',
  })
  poster: string;

  @ApiProperty({ description: '지역', example: '서울특별시' })
  area: string;

  @ApiProperty({ description: '장르', example: '대중음악' })
  genrenm: string;

  @ApiProperty({ description: '오픈런 여부', example: 'N' })
  openrun: string;

  @ApiProperty({ description: '공연 상태', example: '공연완료' })
  prfstate: string;
}

export class GetPerformancesResponseDto {
  @ApiProperty({ type: [PerformanceDto], description: '공연 목록 데이터' })
  performances: PerformanceDto[];
}
