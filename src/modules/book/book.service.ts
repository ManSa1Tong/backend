import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BookService {
  private readonly ALADIN_API_SERVER =
    'http://www.aladin.co.kr/ttb/api/ItemList.aspx';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  private fetchBookApiKey(): string {
    const aladinApiKey = this.configService.get<string>('ALADIN_API_KEY');

    if (!aladinApiKey) {
      throw new InternalServerErrorException(
        '서버 설정 오류: ALADIN_API_KEY가 환경변수에 정의되지 않았습니다.',
      );
    }

    return aladinApiKey;
  }

  private async fetchManyBookData({ SearchTarget }: { SearchTarget: string }) {
    try {
      const queryString = new URLSearchParams({
        ttbkey: this.fetchBookApiKey(),
        QueryType: 'ItemNewAll',
        SearchTarget,
        start: '1',
        MaxResults: '10',
        output: 'js',
        Version: '20131101',
      }).toString();
      const url = `${this.ALADIN_API_SERVER}?${queryString}`;

      const { data } = await firstValueFrom(this.httpService.get(url));

      return data;
    } catch (error) {
      console.error(`ALADIN API 호출 실패: ${error.message}`);
      throw new InternalServerErrorException(
        `ALADIN API 호출 중 오류 발생: ${error.message}`,
      );
    }
  }

  async fetchManyBook() {
    const books = await this.fetchManyBookData({ SearchTarget: 'Book' });
    const foreignBooks = await this.fetchManyBookData({
      SearchTarget: 'Foreign',
    });
    const eBooks = await this.fetchManyBookData({ SearchTarget: 'eBook' });

    return {
      books: books.item,
      foreignBooks: foreignBooks.item,
      eBooks: eBooks.item,
    };
  }
}
