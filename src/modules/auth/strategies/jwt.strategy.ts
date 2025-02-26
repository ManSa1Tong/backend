import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: readFileSync(
        join(
          process.cwd(),
          configService.get<string>('JWT_ACCESS_PUBLIC_KEY_PATH') ||
            'keys/access_public.pem',
        ),
        'utf8',
      ),
      algorithms: ['RS256'], // ✅ RS256 명시
    });
  }

  async validate(payload: JwtPayloadDto): Promise<any> {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('유효하지 않은 JWT Payload 입니다');
    }
    const user = {
      userId: payload.sub,
      email: payload.email,
    };

    if (!user.userId) {
      throw new UnauthorizedException('UserId가 없습니다');
    }

    return user;
  }
}
