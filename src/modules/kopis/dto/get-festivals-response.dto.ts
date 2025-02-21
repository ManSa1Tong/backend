import { ApiProperty } from '@nestjs/swagger';

class FestivalDto {
  @ApiProperty({ description: '공연 ID', example: 'PF245230' })
  mt20id: string;

  @ApiProperty({
    description: '공연명',
    example: '서울대음대 뮤지션들의 지브리OST콘서트 (2.8/2.17)',
  })
  prfnm: string;

  @ApiProperty({ description: '공연 시작일', example: '2024.02.08' })
  prfpdfrom: string;

  @ApiProperty({ description: '공연 종료일', example: '2024.02.17' })
  prfpdto: string;

  @ApiProperty({ description: '공연 시설명', example: '에스파스클래식' })
  fcltynm: string;

  @ApiProperty({
    description: '포스터 이미지 URL',
    example:
      'http://www.kopis.or.kr/upload/pfmPoster/PF_PF245230_240717_151107.png',
  })
  poster: string;

  @ApiProperty({ description: '지역', example: '서울특별시' })
  area: string;

  @ApiProperty({ description: '장르', example: '서양음악(클래식)' })
  genrenm: string;

  @ApiProperty({ description: '축제 여부', example: 'Y' })
  festival: string;

  @ApiProperty({ description: '공연 상태', example: '공연완료' })
  prfstate: string;
}

export class GetFestivalsResponseDto {
  @ApiProperty({ type: [FestivalDto], description: '축제 목록 데이터' })
  festivals: FestivalDto[];
}
