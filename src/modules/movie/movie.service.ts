import {
  InternalServerErrorException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  private readonly MOVIE_API_SERVER =
    'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice';

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

  private validateDates(...dates: string[]) {
    for (const date of dates) {
      if (!/^\d{8}$/.test(date)) {
        throw new BadRequestException(
          `날짜 형식이 올바르지 않습니다. (YYYYMMDD 형식 필요): ${date}`,
        );
      }
    }
  }

  private async fetchMovieData({
    endpoint,
    params,
  }: {
    endpoint: string;
    params: Record<string, any>;
  }) {
    try {
      // ✅ 공통 API URL 생성
      this.validateDates(params.targetDt);

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

  async fetchManyDailyMovie({
    targetDt,
    itemPerPage = '10',
    multiMovieYn,
    repNationCd,
  }: {
    targetDt: string;
    itemPerPage?: string;
    multiMovieYn?: string;
    repNationCd?: string;
  }) {
    const params: Record<string, string> = { targetDt };

    params.itemPerPage = itemPerPage;
    if (multiMovieYn) params.multiMovieYn = multiMovieYn;
    if (repNationCd) params.repNationCd = repNationCd;

    return this.fetchMovieData({
      endpoint: '/searchDailyBoxOfficeList.json',
      params,
    });

    // const MOVIE_IMAGE_API_SERVER =
    //   'https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2';
    // const MOVIE_IMAGE_API_KEY = process.env.MOVIE_IMAGE_KEY;
  }

  async fetchManyWeeklyMovie({
    targetDt,
    weekGb = '1',
    itemPerPage = '10',
    multiMovieYn,
    repNationCd,
  }: {
    targetDt: string;
    weekGb?: string;
    itemPerPage?: string;
    multiMovieYn?: string;
    repNationCd?: string;
  }) {
    const params: Record<string, string> = { targetDt };

    params.itemPerPage = itemPerPage;
    params.weekGb = weekGb;
    if (multiMovieYn) params.multiMovieYn = multiMovieYn;
    if (repNationCd) params.repNationCd = repNationCd;

    return this.fetchMovieData({
      endpoint: '/searchWeeklyBoxOfficeList.json',
      params,
    });

    // const MOVIE_IMAGE_API_SERVER =
    //   'https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2';
    // const MOVIE_IMAGE_API_KEY = process.env.MOVIE_IMAGE_KEY;
  }
}
