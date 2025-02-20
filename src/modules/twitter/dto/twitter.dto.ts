import { ApiProperty } from '@nestjs/swagger';

export class TweetDto {
  @ApiProperty({
    example: 'League of Legends (@LeagueOfLegends) / Twitter',
    description: '트위터 계정명',
  })
  account: string;

  @ApiProperty({
    example:
      'Death is simply another conquest 😤 Prepare for Sahn-Uzal Mordekaiser, entering the Sanctum on 3/5.',
    description: '트윗 내용',
  })
  title: string;

  @ApiProperty({
    example: 'https://x.com/LeagueOfLegends/status/1891518507940036959',
    description: '트윗 URL',
  })
  link: string;

  @ApiProperty({
    example: '2025-02-17T16:02:09.000Z',
    description: '트윗 게시 날짜 (ISO 형식)',
  })
  date: string;
}
