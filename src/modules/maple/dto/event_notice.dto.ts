import { ApiProperty } from '@nestjs/swagger';

export class EventNoticeDto {
  @ApiProperty({
    example: 'League of Legends (@LeagueOfLegends) / Twitter',
    description: '공지 제목',
  })
  title: string;

  @ApiProperty({
    example: 'League of Legends (@LeagueOfLegends) / Twitter',
    description: '공지 링크',
  })
  url: string;

  @ApiProperty({
    example: 'League of Legends (@LeagueOfLegends) / Twitter',
    description: '공지 본문',
  })
  contents: string;

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
