import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AuthService {
  private accessPrivateKey: string;
  private refreshPrivateKey: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {
    this.accessPrivateKey = readFileSync(
      join(
        __dirname,
        '..',
        '..',
        '..',
        this.configService.get<string>('JWT_ACCESS_PRIVATE_KEY_PATH') || '',
      ),
      'utf8',
    );
    this.refreshPrivateKey = readFileSync(
      join(
        __dirname,
        '..',
        '..',
        '..',
        this.configService.get<string>('JWT_REFRESH_PRIVATE_KEY_PATH') || '',
      ),
      'utf8',
    );
  }

  async generateAccessToken(user: { id: number; email: string }) {
    // ✅ id 타입을 number로 변경
    const payload = { sub: user.id.toString(), email: user.email }; // ✅ id를 string으로 변환하여 payload에 저장
    return this.jwtService.sign(payload, {
      privateKey: this.accessPrivateKey,
      algorithm: 'RS256',
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES'),
    });
  }

  async generateRefreshToken(user: { id: number; email: string }) {
    // ✅ id 타입을 number로 변경
    const payload = { sub: user.id.toString() }; // ✅ id를 string으로 변환하여 payload에 저장
    return this.jwtService.sign(payload, {
      privateKey: this.refreshPrivateKey,
      algorithm: 'RS256',
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
    });
  }

  // 회원가입 로직
  async signUp(signUpDto: SignUpDto) {
    const { email, password, nickname } = signUpDto;

    // 이메일 중복 체크
    const isEmailAvailable =
      await this.userService.checkEmailAvailability(email);
    if (!isEmailAvailable) {
      throw new BadRequestException('이미 사용 중인 이메일입니다.');
    }

    // 닉네임 중복 체크
    const isNicknameAvailable =
      await this.userService.checkNicknameAvailability(nickname);
    if (!isNicknameAvailable) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다.');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
    });

    // 성공 메시지 반환
    return {
      success: true,
      message: '회원가입이 완료되었습니다.',
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password, deviceId } = loginDto;

    // 1. 사용자 확인
    const user = await this.userService.findUserByEmail(email);
    if (!user || !user.password) {
      throw new BadRequestException(
        '가입되지 않은 계정이거나 소셜 전용 계정입니다.',
      );
    }

    // 2. 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException({
        success: false,
        message: '비밀번호가 틀렸습니다.',
        data: null,
      });
    }

    // 3. 새로운 JWT 발급 (payload: { id: number; email: string }) 함수 시그니처에 맞춰서 수정
    const accessToken = await this.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = await this.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // 4. (userId, deviceId)로 upsert
    await this.prisma.session.upsert({
      where: {
        // 복합 유니크: userId_deviceId
        userId_deviceId: {
          userId: user.id,
          deviceId,
        },
      },
      create: {
        userId: user.id,
        deviceId,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      update: {
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // 5. 성공 응답 반환
    return {
      success: true,
      message: '로그인 되었습니다',
      data: {
        accessToken,
        refreshToken,
        deviceId,
      },
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
    };
  }

  // 로그아웃
  async logout(userId: number) {
    // Session 테이블에서 userId에 해당하는 모든 세션 삭제
    await this.prisma.session.deleteMany({
      where: { userId: Number(userId) }, // ✅ userId를 number로 변환
    });

    return { message: '로그아웃 성공' };
  }

  // 리프레시 토큰 갱신
  async refreshTokens(refreshDto: { refreshToken: string; deviceId: string }) {
    try {
      const { refreshToken, deviceId } = refreshDto;

      // 1. 리프레시 토큰 검증 (RSA 공개키)
      const payload = this.jwtService.verify(refreshToken, {
        publicKey: readFileSync(
          join(
            __dirname,
            '..',
            '..',
            '..',
            this.configService.get<string>('JWT_REFRESH_PUBLIC_KEY_PATH') || '',
          ),
          'utf8',
        ),
        algorithms: ['RS256'],
      });

      const userId = parseInt(payload.sub);

      // 2. Session 테이블에서 (userId, deviceId)로 세션 찾기 (복합 유니크)
      const session = await this.prisma.session.findUnique({
        where: {
          userId_deviceId: {
            userId,
            deviceId,
          },
        },
      });

      // 세션이 없거나 리프레시 토큰이 일치하지 않으면 오류
      if (!session || session.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // 3. 새 JWT 발급
      const newAccessToken = await this.generateAccessToken({
        id: userId,
        email: payload.email,
      });
      const newRefreshToken = await this.generateRefreshToken({
        id: userId,
        email: payload.email,
      });

      // 4. 세션 업데이트
      await this.prisma.session.update({
        where: {
          userId_deviceId: {
            userId,
            deviceId,
          },
        },
        data: {
          refreshToken: newRefreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      // 5. 새로운 토큰 반환
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        deviceId,
      };
    } catch (error) {
      console.error('Refresh token verify error:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // 구글 소셜 로그인
  async createGoogleLogin(payload: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    sub: string;
    deviceId: string; // ⭐
  }) {
    const { email, firstName, lastName, picture, sub, deviceId } = payload;

    // 1. 유저 upsert
    const user = await this.prisma.user.upsert({
      where: { email },
      create: {
        email,
        password: null,
        authProvider: 'google',
        authProviderId: sub,
        nickname: `${firstName} ${lastName}`,
        profileImage: picture,
      },
      update: {
        authProviderId: sub,
        nickname: `${firstName} ${lastName}`,
        profileImage: picture,
      },
    });

    // 2. 액세스/리프레시 토큰 발급
    const accessToken = await this.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = await this.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // 3. Session 테이블 upsert (복합 유니크)
    await this.prisma.session.upsert({
      where: {
        userId_deviceId: {
          userId: user.id,
          deviceId,
        },
      },
      create: {
        userId: user.id,
        deviceId,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      update: {
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      message: '구글 소셜로그인에 성공했습니다.',
      accessToken,
      refreshToken,
      deviceId,
      user: {
        email: user.email,
        nickname: user.nickname,
        profileImage: user.profileImage,
      },
    };
  }

  // 네이버 소셜 로그인
  async createNaverLogin(payload: {
    email: string;
    nickname: string;
    id: string;
    profileImage?: string;
    deviceId: string; // ⭐
  }) {
    const { email, nickname, id, profileImage, deviceId } = payload;

    // 1. 유저 upsert
    const user = await this.prisma.user.upsert({
      where: { email },
      create: {
        email,
        password: null,
        authProvider: 'naver',
        authProviderId: id,
        nickname,
        profileImage: profileImage ?? '',
      },
      update: {
        authProviderId: id,
        nickname,
        profileImage: profileImage ?? '',
      },
    });

    // 2. 액세스/리프레시 토큰 발급
    const accessToken = await this.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = await this.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // 3. 세션 upsert
    await this.prisma.session.upsert({
      where: {
        userId_deviceId: {
          userId: user.id,
          deviceId,
        },
      },
      create: {
        userId: user.id,
        deviceId,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      update: {
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      message: '네이버 소셜로그인에 성공했습니다.',
      accessToken,
      refreshToken,
      deviceId,
      user: {
        email: user.email,
        nickname: user.nickname,
        profileImage: user.profileImage,
      },
    };
  }
}
