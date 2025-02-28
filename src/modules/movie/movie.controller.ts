import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { GetMovieCodeDto, GetMovieListDto } from './dto/fetch-movie.dto';
import {
  GetMovieCodeResponseDto,
  MovieInfoDto,
  MovieResponseDto,
} from './dto/movie.controller';
import {
  ApiResponseSuccess,
  ApiResponseError,
  ApiOperationSummary,
} from 'src/decorators/swagger-response.decorator';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @ApiOperationSummary('영화 목록 조회', ' 영화 목록 10개를 가지고 옵니다.')
  @ApiResponseSuccess('영화 목록 조회 성공', MovieResponseDto)
  @ApiResponseError('키 값을 잘못 입력하였습니다.', 400)
  @ApiResponseError('서버 오류', 500)
  async getManyWeeklyMovie(@Query() data: GetMovieListDto) {
    return await this.movieService.fetchManyMovie(data);
  }

  @ApiOperationSummary('영화 공동 코드 조회', '영화 공동 코드를 조회합니다.')
  @ApiResponseSuccess('영화 정보 조회 성공', [GetMovieCodeResponseDto])
  @Get('/code')
  async getManyMovieCode(@Query() { comCode }: GetMovieCodeDto) {
    return await this.movieService.fetchMovieCodeData({ comCode });
  }

  @ApiOperationSummary('영화 정보 상세보기', '영화 정보를 조회합니다.')
  @ApiResponseSuccess('영화 정보 조회 성공', MovieInfoDto)
  @Get('/:movieCd')
  async getManyDaliyMovie(@Param('movieCd') movieCd: string) {
    return await this.movieService.fetchMovie({
      movieCd,
    });
  }
}
