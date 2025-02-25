import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  private readonly MOVIE_API_SERVER =
    'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie';
  private readonly MOVIE_IMAGE_API_SERVER =
    'https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2';
  private readonly MOVIE_CODE_API_SERVER =
    'http://www.kobis.or.kr/kobisopenapi/webservice/rest/code/searchCodeList.json';

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private fetchMovieApiKey(): string {
    const movieApiKey = this.configService.get<string>('MOVIE_API_KEY');
    if (!movieApiKey) {
      throw new InternalServerErrorException(
        '서버 설정 오류: MOVIE_API_KEY가 환경변수에 정의되지 않았습니다.',
      );
    }
    return movieApiKey;
  }

  private fetchMovieImageApiKey(): string {
    const movieImageApiKey = this.configService.get<string>('MOVIE_IMAGE_KEY');
    if (!movieImageApiKey) {
      throw new InternalServerErrorException(
        '서버 설정 오류: MOVIE_IMAGE_KEY가 환경변수에 정의되지 않았습니다.',
      );
    }
    return movieImageApiKey;
  }

  private async fetchMovieData({
    endpoint,
    params,
  }: {
    endpoint: string;
    params: Record<string, any>;
  }) {
    try {
      const queryString = new URLSearchParams({
        key: this.fetchMovieApiKey(),
        ...params,
      }).toString();
      const url = `${this.MOVIE_API_SERVER}/${endpoint}?${queryString}`;

      const { data } = await firstValueFrom(this.httpService.get(url));

      return data;
    } catch (error) {
      console.error(`MOVIE API 호출 실패: ${error.message}`);
      throw new InternalServerErrorException(
        `MOVIE API 호출 중 오류 발생: ${error.message}`,
      );
    }
  }

  private async fetchMovieImageData({
    title,
    listCount = '500',
  }: {
    title: string;
    listCount?: string;
  }) {
    try {
      const queryString = new URLSearchParams({
        ServiceKey: this.fetchMovieImageApiKey(),
        title,
        listCount,
      }).toString();
      const url = `${this.MOVIE_IMAGE_API_SERVER}&${queryString}`;

      const { data } = await firstValueFrom(this.httpService.get(url));

      return data;
    } catch (error) {
      console.error(`MOVIE IMAGE API 호출 실패: ${error.message}`);
      throw new InternalServerErrorException(
        `MOVIE IMAGE API 호출 중 오류 발생: ${error.message}`,
      );
    }
  }

  async fetchManyMovie({
    curPage = '1',
    itemPerPage = '10',
    movieNm,
    directorNm,
    openStartDt,
    openEndDt,
    prdtStartYear,
    prdtEndYear,
    repNationCd,
    movieTypeCd,
  }: {
    curPage: string;
    itemPerPage: string;
    movieNm: string;
    directorNm: string;
    openStartDt: string;
    openEndDt: string;
    prdtStartYear: string;
    prdtEndYear: string;
    repNationCd: string;
    movieTypeCd: string;
  }) {
    const params: Record<string, string> = { curPage, itemPerPage };

    params.itemPerPage = itemPerPage;
    params.curPage = curPage;
    if (movieNm) params.movieNm = movieNm;
    if (directorNm) params.directorNm = directorNm;
    if (openStartDt) params.openStartDt = openStartDt;
    if (openEndDt) params.openEndDt = openEndDt;
    if (prdtStartYear) params.prdtStartYear = prdtStartYear;
    if (prdtEndYear) params.prdtEndYear = prdtEndYear;
    if (repNationCd) params.repNationCd = repNationCd;
    if (movieTypeCd) params.movieTypeCd = movieTypeCd;

    return this.fetchMovieData({
      endpoint: '/searchMovieList.json',
      params,
    });
  }

  async fetchMovie({ movieCd }: { movieCd: string }) {
    const params: Record<string, string> = { movieCd };

    params.movieCd = movieCd;

    const { movieInfoResult } = await this.fetchMovieData({
      endpoint: '/searchMovieInfo.json',
      params,
    });

    const movieImageData = await this.fetchMovieImageData({
      title: movieInfoResult.movieInfo.movieNm,
    });
    const matchedMovie = movieImageData?.Data?.[0]?.Result?.find(
      (item: any) => item?.CommCodes?.CommCode?.[0].CodeNo === movieCd,
    );

    return {
      ...movieInfoResult,
      poster: matchedMovie?.posters?.split('|')[0] || '',
    };
  }

  async fetchMovieCodeData({ comCode }: { comCode: string }) {
    try {
      const queryString = new URLSearchParams({
        key: this.fetchMovieApiKey(),
        comCode,
      }).toString();
      const url = `${this.MOVIE_CODE_API_SERVER}?${queryString}`;

      const { data } = await firstValueFrom(this.httpService.get(url));

      return data;
    } catch (error) {
      console.error(`MOVIE CODE API 호출 실패: ${error.message}`);
      throw new InternalServerErrorException(
        `MOVIE CODE API 호출 중 오류 발생: ${error.message}`,
      );
    }
  }
}
