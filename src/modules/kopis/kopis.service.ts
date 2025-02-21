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

  // ✅ XML을 JSON으로 변환하는 메서드 (중복 제거)
  private async parseXmlToJson(xmlData: string): Promise<any> {
    try {
      return await parseStringPromise(xmlData, { explicitArray: false });
    } catch (error) {
      this.logger.error(`XML 파싱 실패: ${error.message}`);
      throw new HttpException(
        `XML 데이터 변환 오류: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ✅ API 호출 및 JSON 변환 처리 (중복 제거)
  private async fetchAndParseKopisData(url: string, errorMessage: string) {
    try {
      const response = await firstValueFrom(this.httpService.get(url));

      let jsonData;
      if (typeof response.data === 'string') {
        jsonData = await this.parseXmlToJson(response.data);
      } else {
        jsonData = response.data;
      }

      if (!jsonData || !jsonData.dbs || !jsonData.dbs.db) {
        throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
      }

      return jsonData.dbs.db;
    } catch (error) {
      this.logger.error(`KOPIS API 호출 실패: ${error.message}`);
      throw new HttpException(
        `KOPIS API 호출 중 오류 발생: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
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

    const url = `${this.BASE_URL}/pblprfr?service=${this.getApiKey()}&stdate=${startDate}&eddate=${endDate}&cpage=${page}&rows=${rows}`;
    return this.fetchAndParseKopisData(url, '공연 목록을 찾을 수 없습니다.');
  }

  async fetchManyFestivals(
    startDate: string,
    endDate: string,
    page = 1,
    rows = 10,
  ) {
    this.validateDateFormat(startDate);
    this.validateDateFormat(endDate);

    const url = `${this.BASE_URL}/prffest?service=${this.getApiKey()}&stdate=${startDate}&eddate=${endDate}&cpage=${page}&rows=${rows}`;
    return this.fetchAndParseKopisData(url, '축제 목록을 찾을 수 없습니다.');
  }

  async fetchPerformanceDetail(id: string) {
    if (!id) {
      throw new HttpException('공연 ID가 필요합니다.', HttpStatus.BAD_REQUEST);
    }

    const url = `${this.BASE_URL}/pblprfr/${id}?service=${this.getApiKey()}`;
    return this.fetchAndParseKopisData(
      url,
      '해당 공연 정보를 찾을 수 없습니다.',
    );
  }
}
