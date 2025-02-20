import { ApiProperty } from '@nestjs/swagger';
import { TweetDto } from './twitter.dto';

export class GroupedTweetsDto {
  @ApiProperty({
    type: () => Object,
    example: {
      'League of Legends (@LeagueOfLegends) / Twitter': [
        {
          account: 'League of Legends (@LeagueOfLegends) / Twitter',
          title:
            'Death is simply another conquest 😤 Prepare for Sahn-Uzal Mordekaiser, entering the Sanctum on 3/5.',
          link: 'https://x.com/LeagueOfLegends/status/12345',
          date: '2025-02-17T16:02:09.000Z',
        },
      ],
    },
    description: '계정별 트윗 리스트',
  })
  accounts: Record<string, TweetDto[]>; // ✅ Swagger에서 올바르게 인식되도록 수정
}
