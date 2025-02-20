import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import * as cheerio from 'cheerio'; // HTML 제거를 위한 cheerio 라이브러리
import { TweetDto } from '../twitter/dto/twitter.dto'; // DTO 임포트 추가

@Injectable()
export class TwitterService {
  private parser = new Parser();

  // 🔥 환경변수에서 RSS 피드 리스트 불러오기
  private rssFeeds: string[] = process.env.RSS_FEEDS?.split(',') || [];

  async getLatestTweets(): Promise<{ accounts: Record<string, TweetDto[]> }> {
    const allTweets: TweetDto[] = [];

    for (const rssUrl of this.rssFeeds) {
      try {
        const feed = await this.parser.parseURL(rssUrl);

        if (!feed || !feed.items) {
          console.warn(`⚠️ RSS 데이터를 가져올 수 없습니다: ${rssUrl}`);
          continue;
        }

        for (const item of feed.items.slice(0, 3)) {
          if (!item.title || !item.link || !item.pubDate) {
            console.warn(
              `⚠️ 불완전한 데이터 발견 (제외됨): ${JSON.stringify(item)}`,
            );
            continue;
          }

          // ✅ 트윗 원문 HTML 제거 + 불필요한 pic.twitter.com 제거
          const cleanTitle = this.cleanTweetText(
            item.content || item.contentSnippet || item.title,
          );

          allTweets.push({
            account: feed.title || '알 수 없는 계정', // 계정명 없으면 기본값
            title: cleanTitle, // HTML 제거한 트윗 내용
            link: item.link || '#', // 기본값 설정
            date: this.parseDate(item.pubDate).toISOString(), // ISO 형식 변환
          });
        }
      } catch (error) {
        console.error(`🚨 RSS 피드 로드 실패: ${rssUrl}`, error);
      }
    }

    // ✅ 계정별로 그룹화하여 반환
    return { accounts: this.groupTweetsByAccount(allTweets) };
  }

  // ✅ HTML 제거 및 pic.twitter.com 같은 링크 삭제
  private cleanTweetText(html: string): string {
    const $ = cheerio.load(html);
    let text = $.text().trim(); // HTML 태그 제거 후 텍스트만 추출

    // 🔥 불필요한 pic.twitter.com/xxx 링크 제거
    text = text.replace(/pic\.twitter\.com\/\S+/g, '').trim();

    return text;
  }

  // ✅ 날짜 변환 (유효한 날짜 없으면 현재 시간)
  private parseDate(dateString: string): Date {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  }

  // ✅ 계정별로 트윗 그룹화
  private groupTweetsByAccount(tweets: TweetDto[]): Record<string, TweetDto[]> {
    return tweets.reduce(
      (acc, tweet) => {
        const account = tweet.account;
        if (!acc[account]) {
          acc[account] = [];
        }
        acc[account].push(tweet);
        return acc;
      },
      {} as Record<string, TweetDto[]>,
    );
  }
}
