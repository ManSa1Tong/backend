import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MovieService {
  async fetchManyDailyMovie({ targetDt }: { targetDt: string }) {
    const MOVIE_API_SERVER =
      'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
    const API_KEY = process.env.MOVIE_KEY;

    try {
      const { data } = await axios.get(MOVIE_API_SERVER, {
        params: {
          key: API_KEY,
          targetDt,
        },
      });

      return data;
    } catch (error) {
      console.error('Error Status:', error.response?.status);
      console.error('Error Message:', error.response?.data?.error?.message);
      console.error('Error Headers:', error.response?.headers);

      return error;
    }
  }
}
