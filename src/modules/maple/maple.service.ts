import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapleService {
  async fetchManyEventNotice() {
    const MAPLE_API_SERVER = 'https://open.api.nexon.com/maplestory/v1';
    const API_KEY = process.env.MAPLE_API_KEY;

    const instance = axios.create({
      baseURL: MAPLE_API_SERVER,
    });

    try {
      const { data } = await instance.get('/notice-event', {
        headers: { 'x-nxopen-api-key': API_KEY },
      });

      return data;
    } catch (error) {
      console.error('Error Status:', error.response?.status);
      console.error('Error Message:', error.response?.data?.error?.message);
      console.error('Error Headers:', error.response?.headers);
    }
  }
}
