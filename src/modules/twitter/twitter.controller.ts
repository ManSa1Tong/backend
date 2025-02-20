import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TwitterService } from './twitter.service';
import { GroupedTweetsDto } from './dto/grouped-tweets.dto';

@ApiTags('twitter')
@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '트위터 최신 트윗 가져오기',
    description: '여러 트위터 계정의 최신 트윗을 가져옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '트위터 데이터 조회 성공',
    type: GroupedTweetsDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류',
    schema: {
      example: {
        statusCode: 500,
        message: '트위터 데이터를 가져오는 중 오류가 발생했습니다.',
        error: 'Internal Server Error',
      },
    },
  })
  async getLatestTweets(): Promise<GroupedTweetsDto> {
    return await this.twitterService.getLatestTweets(); // ✅ 그대로 반환
  }
}
