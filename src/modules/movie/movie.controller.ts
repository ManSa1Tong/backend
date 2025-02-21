import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { GetDaliyMovieDto } from './dto/fetch-dailyMovie.dto';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/daily')
  async getManyDaliyMovie(
    @Query()
    { targetDt, itemPerPage, multiMovieYn, repNationCd }: GetDaliyMovieDto,
  ) {
    return await this.movieService.fetchManyDailyMovie({
      targetDt,
      itemPerPage,
      multiMovieYn,
      repNationCd,
    });
  }
}
