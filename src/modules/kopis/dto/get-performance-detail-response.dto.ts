import { ApiProperty } from '@nestjs/swagger';

class StyUrlsDto {
  @ApiProperty({
    description: '공연 소개 이미지 리스트',
    example: [
      'http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF132236_161107_0245254.jpg',
      'http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF132236_161107_0245253.jpg',
      'http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF132236_161107_0245252.jpg',
      'http://www.kopis.or.kr/upload/pfmIntroImage/PF_PF132236_161107_0245251.jpg',
    ],
  })
  styurl: string[];
}

class RelateDto {
  @ApiProperty({ description: '예매처명', example: '티켓링크' })
  relatenm?: string;

  @ApiProperty({
    description: '예매처 URL',
    example: 'http://www.ticketlink.co.kr/product/14015',
  })
  relateurl: string;
}

class RelatesDto {
  @ApiProperty({
    type: [RelateDto],
    description: '예매처 목록',
  })
  relate: RelateDto[];
}

export class GetPerformanceDetailResponseDto {
  @ApiProperty({ description: '공연 ID', example: 'PF132236' })
  mt20id: string;

  @ApiProperty({ description: '공연명', example: '우리 연애할까?' })
  prfnm: string;

  @ApiProperty({ description: '공연 시작일', example: '2016.05.12' })
  prfpdfrom: string;

  @ApiProperty({ description: '공연 종료일', example: '2016.12.31' })
  prfpdto: string;

  @ApiProperty({
    description: '공연 시설명',
    example: '해바라기소극장 (구. 훈아트홀)',
  })
  fcltynm: string;

  @ApiProperty({
    description: '출연진',
    example: '김세연, 신성진, 정재연, 전다정, 장보경, 최민기',
  })
  prfcast: string;

  @ApiProperty({ description: '제작진', example: '천정민' })
  prfcrew: string;

  @ApiProperty({ description: '공연 런타임', example: '1시간 30분' })
  prfruntime: string;

  @ApiProperty({ description: '공연 관람 연령', example: '만 12세 이상' })
  prfage: string;

  @ApiProperty({
    description: '기획/제작사',
    example: '극단 피에로(문화제작소)',
  })
  entrpsnm: string;

  @ApiProperty({ description: '제작사', example: '극단 피에로(문화제작소)' })
  entrpsnmP: string;

  @ApiProperty({ description: '기획사', example: '' })
  entrpsnmA: string;

  @ApiProperty({ description: '주최', example: '' })
  entrpsnmH: string;

  @ApiProperty({ description: '주관', example: '' })
  entrpsnmS: string;

  @ApiProperty({ description: '티켓 가격', example: '전석 30,000원' })
  pcseguidance: string;

  @ApiProperty({
    description: '포스터 이미지 URL',
    example:
      'http://www.kopis.or.kr/upload/pfmPoster/PF_PF132236_161107_144405.gif',
  })
  poster: string;

  @ApiProperty({ description: '줄거리', example: '' })
  sty: string;

  @ApiProperty({ description: '지역', example: '서울특별시' })
  area: string;

  @ApiProperty({ description: '장르', example: '연극' })
  genrenm: string;

  @ApiProperty({ description: '오픈런 여부', example: 'N' })
  openrun: string;

  @ApiProperty({ description: '내한 공연 여부', example: 'N' })
  visit: string;

  @ApiProperty({ description: '아동 공연 여부', example: 'N' })
  child: string;

  @ApiProperty({ description: '대학로 공연 여부', example: 'Y' })
  daehakro: string;

  @ApiProperty({ description: '축제 여부', example: 'N' })
  festival: string;

  @ApiProperty({ description: '뮤지컬 라이센스 여부', example: 'N' })
  musicallicense: string;

  @ApiProperty({ description: '뮤지컬 창작 여부', example: 'N' })
  musicalcreate: string;

  @ApiProperty({ description: '최종 수정일', example: '2019-07-25 10:03:14' })
  updatedate: string;

  @ApiProperty({ description: '공연 상태', example: '공연완료' })
  prfstate: string;

  @ApiProperty({
    type: StyUrlsDto,
    description: '공연 소개 이미지 리스트',
  })
  styurls: StyUrlsDto;

  @ApiProperty({ description: '공연 시설 ID', example: 'FC001431' })
  mt10id: string;

  @ApiProperty({
    description: '공연 시간 안내',
    example:
      '화요일 ~ 금요일(20:00), 토요일(15:00,17:30,20:00), 일요일(15:30,18:00)',
  })
  dtguidance: string;

  @ApiProperty({
    type: RelatesDto,
    description: '예매처 목록',
  })
  relates: RelatesDto;
}
