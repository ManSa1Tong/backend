import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TwitterService } from './twitter.service';
import { GroupedTweetsDto } from './dto/grouped-tweets.dto';
import {
  ApiResponseSuccess,
  ApiResponseError,
  ApiOperationSummary,
} from 'src/decorators/swagger-response.decorator';

@ApiTags('twitter')
@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get()
  @ApiOperationSummary(
    '트위터 최신 트윗 가져오기',
    '여러 트위터 계정의 최신 트윗을 가져옵니다.',
  )
  @ApiResponseSuccess('트위터 데이터 조회 성공', GroupedTweetsDto)
  @ApiResponseError('서버 오류', 500)
  async getLatestTweets(): Promise<GroupedTweetsDto> {
    return await this.twitterService.getLatestTweets(); // ✅ 그대로 반환
  }
}
