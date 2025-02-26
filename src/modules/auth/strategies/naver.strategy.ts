import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('NAVER_CLIENT_ID') || '',
      clientSecret: configService.get<string>('NAVER_CLIENT_SECRET') || '',
      callbackURL: configService.get<string>('NAVER_CALLBACK_URL') || '',
    });
  }

  // 네이버 OAuth 서버에서 인증이 완료되면 이 validate 함수가 호출됨
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user?: any) => void, // ✅ 명시적으로 타입 지정
  ): Promise<any> {
    const { id, email, nickname } = profile._json;

    const user = {
      provider: 'naver',
      providerId: id,
      email,
      name: nickname,
      accessToken,
    };
    // done(null, user) → 인증 성공 시 user 객체 반환
    done(null, user);
  }
}
