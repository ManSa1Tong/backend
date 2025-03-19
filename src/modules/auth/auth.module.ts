import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { NaverStrategy } from './strategies/naver.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ session: false }), // 세션 사용 안 할 경우 session: false
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: readFileSync(
          join(
            __dirname,
            '..',
            '..',
            '..',
            configService.get<string>('JWT_ACCESS_PRIVATE_KEY_PATH') || '', // ✅ undefined 방지
          ),
          'utf8',
        ),
        publicKey: readFileSync(
          join(
            __dirname,
            '..',
            '..',
            '..',
            configService.get<string>('JWT_ACCESS_PUBLIC_KEY_PATH') || '', // ✅ undefined 방지
          ),
          'utf8',
        ),
        signOptions: {
          algorithm: 'RS256',
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES') || '', // ✅ undefined 방지
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,
    UserService,
    GoogleStrategy,
    NaverStrategy,
  ],
  exports: [JwtModule, JwtAuthGuard],
})
export class AuthModule {}
