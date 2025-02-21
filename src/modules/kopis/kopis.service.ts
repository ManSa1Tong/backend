import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class KopisService {
  private readonly BASE_URL = 'http://kopis.or.kr/openApi/restful';
  private readonly logger = new Logger(KopisService.name); // ✅ Logger 추가

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getApiKey(): string {
    const apiKey = this.configService.get<string>('KOPIS_API_KEY');
    if (!apiKey) {
      throw new HttpException(
        '서버 설정 오류: KOPIS_API_KEY가 환경변수에 정의되지 않았습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return apiKey;
  }

  private validateDateFormat(date: string) {
    if (!/^\d{8}$/.test(date)) {
      throw new HttpException(
        `날짜 형식이 올바르지 않습니다. (YYYYMMDD 형식 필요): ${date}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async fetchManyPerformances(
    startDate: string,
    endDate: string,
    page = 1,
    rows = 10,
  ) {
    this.validateDateFormat(startDate);
    this.validateDateFormat(endDate);

    try {
      const url = `${this.BASE_URL}/pblprfr?service=${this.getApiKey()}&stdate=${startDate}&eddate=${endDate}&cpage=${page}&rows=${rows}`;
      const response = await firstValueFrom(this.httpService.get(url));

      // ✅ XML → JSON 변환
      let jsonData;
      if (typeof response.data === 'string') {
        jsonData = await parseStringPromise(response.data, {
          explicitArray: false,
        });
      } else {
        jsonData = response.data;
      }

      // ✅ JSON 변환 후 데이터 확인
      if (!jsonData || !jsonData.dbs || !jsonData.dbs.db) {
        throw new HttpException(
          '공연 목록을 찾을 수 없습니다. (KOPIS 응답 데이터 없음)',
          HttpStatus.NOT_FOUND,
        );
      }

      return jsonData.dbs.db; // ✅ 변환된 JSON에서 실제 공연 목록 반환
    } catch (error) {
      this.logger.error(`fetchManyPerformances 실패: ${error.message}`);
      throw new HttpException(
        `KOPIS API 호출 중 오류 발생: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchManyFestivals(
    startDate: string,
    endDate: string,
    page = 1,
    rows = 10,
  ) {
    this.validateDateFormat(startDate);
    this.validateDateFormat(endDate);

    try {
      const url = `${this.BASE_URL}/prffest?service=${this.getApiKey()}&stdate=${startDate}&eddate=${endDate}&cpage=${page}&rows=${rows}`;
      const response = await firstValueFrom(this.httpService.get(url));

      let jsonData;
      if (typeof response.data === 'string') {
        jsonData = await parseStringPromise(response.data, {
          explicitArray: false,
        });
      } else {
        jsonData = response.data;
      }

      if (!jsonData || !jsonData.dbs || !jsonData.dbs.db) {
        throw new HttpException(
          '축제 목록을 찾을 수 없습니다. (KOPIS 응답 데이터 없음)',
          HttpStatus.NOT_FOUND,
        );
      }

      return jsonData.dbs.db;
    } catch (error) {
      this.logger.error(`fetchManyFestivals 실패: ${error.message}`);
      throw new HttpException(
        `KOPIS API 호출 중 오류 발생: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchPerformanceDetail(id: string) {
    if (!id) {
      throw new HttpException('공연 ID가 필요합니다.', HttpStatus.BAD_REQUEST);
    }

    try {
      const url = `${this.BASE_URL}/pblprfr/${id}?service=${this.getApiKey()}`;
      const response = await firstValueFrom(this.httpService.get(url));

      let jsonData;
      if (typeof response.data === 'string') {
        jsonData = await parseStringPromise(response.data, {
          explicitArray: false,
        });
      } else {
        jsonData = response.data;
      }

      if (!jsonData || !jsonData.dbs || !jsonData.dbs.db) {
        throw new HttpException(
          '해당 공연 정보를 찾을 수 없습니다.',
          HttpStatus.NOT_FOUND,
        );
      }

      return jsonData.dbs.db;
    } catch (error) {
      this.logger.error(
        `fetchPerformanceDetail 실패 (ID: ${id}): ${error.message}`,
      );
      throw new HttpException(
        `KOPIS API 호출 중 오류 발생: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
