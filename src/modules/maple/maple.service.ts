import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MapleService {
  private MAPLE_API_SERVER =
    'https://open.api.nexon.com/maplestory/v1/notice-event';
  private INSTANCE = axios.create({
    baseURL: this.MAPLE_API_SERVER,
  });

  constructor(private configService: ConfigService) {}

  private getApiKey(): string {
    const apiKey = this.configService.get<string>('MAPLE_API_KEY');
    if (!apiKey) {
      throw new InternalServerErrorException(
        '서버 설정 오류: MAPLE_API_KEY가 환경변수에 정의되지 않았습니다.',
      );
    }
    return apiKey;
  }

  private async fetchEventNoticeData({ endpoint }: { endpoint?: string }) {
    try {
      const { data } = await this.INSTANCE.get(`${endpoint || ''}`, {
        headers: { 'x-nxopen-api-key': this.getApiKey() },
      });

      return data;
    } catch (error) {
      console.error('Error Status:', error.response?.status);
      console.error('Error Message:', error.response?.data?.error?.message);
      console.error('Error Headers:', error.response?.headers);

      return error;
    }
  }

  async fetchManyEventNotice() {
    return this.fetchEventNoticeData({});
  }

  async fetchEventNotice({ notice_id }: { notice_id: number }) {
    return this.fetchEventNoticeData({
      endpoint: `/detail?notice_id=${notice_id}`,
    });
  }
}
