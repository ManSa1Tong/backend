import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { GetDaliyMovieDto, GetWeeklyMovieDto } from './dto/fetch-movie.dto';
import { ApiGetDaliyMovie, ApiGetWeeklyMovie } from './dto/movie.controller';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/daily')
  @ApiGetDaliyMovie()
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

  @Get('/weekly')
  @ApiGetWeeklyMovie()
  async getManyWeeklyMovie(
    @Query()
    {
      targetDt,
      weekGb,
      itemPerPage,
      multiMovieYn,
      repNationCd,
    }: GetWeeklyMovieDto,
  ) {
    return await this.movieService.fetchManyWeeklyMovie({
      targetDt,
      weekGb,
      itemPerPage,
      multiMovieYn,
      repNationCd,
    });
  }
}
