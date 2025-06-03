import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';

@Injectable()
export class SteamService {
  async getUpcomingGames(): Promise<any[]> {
    const url =
      'https://store.steampowered.com/search/?os=win&supportedlang=english&filter=comingsoon&ndl=1';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const games: any[] = [];

    $('.search_result_row').each((_, el) => {
      const title = $(el).find('.title').text().trim();
      const rawDateText = $(el).find('.search_released').text().trim(); // "2 Jun, 2025"
      const link = $(el).attr('href')?.split('?')[0];
      const image = $(el).find('img').attr('src');

      const rawDate = dayjs(rawDateText, 'D MMM, YYYY').format('YYYY-MM-DD');

      games.push({ title, releaseDate: rawDate, link, image });
    });

    return games;
  }
}
