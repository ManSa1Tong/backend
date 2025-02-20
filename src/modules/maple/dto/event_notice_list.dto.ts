import { ApiProperty } from '@nestjs/swagger';

export class EventNoticeListDto {
  @ApiProperty({
    example: '[챔피언 버닝] - 챔피언 더블 업 & 챌린지',
    description: '공지 제목',
  })
  title: string;

  @ApiProperty({
    example: 'https://maplestory.nexon.com/News/Event/1103',
    description: '공지 링크',
  })
  url: string;

  @ApiProperty({
    example: 1103,
    description: '공지 식별자',
  })
  notice_id: number;

  @ApiProperty({
    example: '2023-12-21T00:00+09:00',
    description: '공지 등록일(시)(KST)',
  })
  date: string;

  @ApiProperty({
    example: '2023-12-21T00:00+09:00',
    description: '이벤트 시작일(시) (KST)',
  })
  date_event_start: string;

  @ApiProperty({
    example: '2023-12-21T00:00+09:00',
    description: '이벤트 종료일(시) (KST)',
  })
  date_event_end: string;
}
