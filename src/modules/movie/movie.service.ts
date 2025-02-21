import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MovieService {
  async fetchManyDailyMovie({
    targetDt,
    itemPerPage,
    multiMovieYn,
    repNationCd,
  }: {
    targetDt: string;
    itemPerPage?: string;
    multiMovieYn?: string;
    repNationCd?: string;
  }) {
    const MOVIE_API_SERVER =
      'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
    const API_KEY = process.env.MOVIE_KEY;

    try {
      const { data } = await axios.get(MOVIE_API_SERVER, {
        params: {
          key: API_KEY,
          targetDt,
          itemPerPage,
          multiMovieYn,
          repNationCd,
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

  async fetchManyWeeklyMovie({
    targetDt,
    weekGb,
    itemPerPage,
    multiMovieYn,
    repNationCd,
  }: {
    targetDt: string;
    weekGb?: string;
    itemPerPage?: string;
    multiMovieYn?: string;
    repNationCd?: string;
  }) {
    const MOVIE_API_SERVER =
      'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json';
    const API_KEY = process.env.MOVIE_KEY;

    try {
      const { data } = await axios.get(MOVIE_API_SERVER, {
        params: {
          key: API_KEY,
          targetDt,
          weekGb,
          itemPerPage,
          multiMovieYn,
          repNationCd,
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
