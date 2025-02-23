import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { GetMovieListDto } from './dto/fetch-movie.dto';
import { ApiGetManyMovie, ApiGetMovie } from './dto/movie.controller';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  @ApiGetManyMovie()
  async getManyWeeklyMovie(@Query() data: GetMovieListDto) {
    return await this.movieService.fetchManyMovie(data);
  }

  @Get('/:movieCd')
  @ApiGetMovie()
  async getManyDaliyMovie(@Param('movieCd') movieCd: string) {
    return await this.movieService.fetchMovie({
      movieCd,
    });
  }
}
