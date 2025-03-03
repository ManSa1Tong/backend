import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/curretUser.decorator';
import { OAuthUser } from 'src/decorators/oauthUser.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST: 회원 가입
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '회원가입',
    description:
      '사용자의 이메일, 닉네임, 비밀번호를 통해 회원가입을 처리합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원 가입 성공',
    type: SignUpDto,
  })
  @ApiResponse({
    status: 400,
    description: '유효성 검사 실패',
    schema: {
      example: {
        statusCode: 400,
        message: [
          '이메일을 입력해주세요.',
          '비밀번호는 8자 이상 20자 이하로 입력해주세요.',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '서버 오류 - 닉네임 중복',
    schema: {
      example: {
        statusCode: 400,
        message: '이미 사용 중인 닉네임입니다.',
        error: 'Bad Request',
      },
    },
  })
  async postSignUp(@Body() signUpDto: SignUpDto) {
    const result = await this.authService.signUp(signUpDto);
    return result; // authService.signUp()의 응답을 그대로 반환
  }

  // POST: 로그인
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인하여 JWT를 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      example: {
        success: true,
        message: '로그인 되었습니다.',
        data: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          deviceId: 'chrome_1234',
        },
        user: {
          id: 8,
          email: 'ManSa1Tong@mail.com',
          nickname: '김만사',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '가입되지 않은 계정',
    schema: {
      example: {
        success: false,
        message: '가입되지 않은 계정입니다.',
        data: null,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 비밀번호',
    schema: {
      example: {
        success: false,
        message: '비밀번호가 틀렸습니다.',
        data: null,
      },
    },
  })
  @ApiResponse({ status: 401, description: '인증에 실패했습니다.' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async postLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // POST: 로그아웃
  @Post('logout')
  @ApiOperation({
    summary: '로그아웃',
    description: '로그아웃을 수행하고 세션을 무효화합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '로그아웃 성공',
    schema: {
      example: {
        message: '로그아웃에 성공했습니다',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'JWT 인증 실패',
    schema: {
      example: {
        statusCode: 401,
        message: '유효하지 않거나 만료된 토큰입니다',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  async postLogout(@CurrentUser() userId: number) {
    await this.authService.logout(userId);

    return { message: '로그아웃에 성공했습니다' };
  }

  // POST: 리프레쉬 토큰 갱신
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '토큰 갱신',
    description:
      '리프레시 토큰을 사용해 새로운 액세스 토큰과 리프레시 토큰을 발급받습니다.',
  })
  @ApiBody({
    description: '리프레시 토큰 요청 본문',
    type: RefreshDto,
  })
  @ApiResponse({
    status: 200,
    description: '새로운 액세스 및 리프레시 토큰 발급 성공',
    schema: {
      example: {
        success: true,
        message: '토큰 갱신 성공',
        data: {
          accessToken: 'new_access_token',
          refreshToken: 'new_refresh_token',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '유효하지 않거나 만료된 리프레시 토큰',
    schema: {
      example: {
        success: false,
        message: 'Invalid refresh token',
      },
    },
  })
  async postRefresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refreshTokens(refreshDto);
  }

  // 1) Google 로그인 요청 → 구글 로그인 창으로 Redirect
  @Get('google')
  @HttpCode(HttpStatus.FOUND)
  @ApiOperation({
    summary: 'Google 로그인 페이지로 리다이렉트',
    description: 'Google 로그인 페이지로 리다이렉트합니다.',
  })
  @ApiResponse({
    status: 302,
    description: 'Google 로그인 페이지로 리다이렉트합니다.',
  })
  @UseGuards(AuthGuard('google'))
  async getGoogleAuth() {
    return { message: 'Google 로그인' };
  }

  // 2) Google 콜백 → 구글 로그인 성공 시
  @Get('google/callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Google 로그인 콜백 처리',
    description:
      'Google 로그인 이후의 콜백을 처리하고 사용자 정보를 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Google 로그인 성공',
    schema: {
      example: {
        message: 'Google 소셜로그인에 성공했습니다',
        accessToken: 'jwt-token',
        refreshToken: 'refresh-token',
        deviceId: 'defaultGoogleDevice',
        user: {
          email: 'user@example.com',
          nickname: 'admin',
          profileImage: 'http://example.com/profile.jpg',
        },
      },
    },
  })
  @UseGuards(AuthGuard('google'))
  async getGoogleAuthRedirect(
    @OAuthUser()
    user: {
      provider: string;
      providerId: string;
      email: string;
      name: string;
      accessToken: string; // 구글 측 OAuth accessToken
    },
    @Query('deviceId') deviceId?: string, // ⭐ 쿼리 파라미터로 deviceId 받기
  ) {
    // 1. user 객체에서 필요한 필드 추출
    const [firstName, lastName] = user.name.split(' ');
    const payload = {
      email: user.email,
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      picture: '',
      sub: user.providerId,
      deviceId: deviceId || 'defaultGoogleDevice', // ⭐ deviceId 추가
    };

    // 2. AuthService의 createGoogleLogin 호출
    const result = await this.authService.createGoogleLogin(payload);

    // 3. 최종 결과 반환
    return result;
  }

  // 1) Naver 로그인 요청 → 네이버 로그인 창으로 Redirect
  @Get('naver')
  @HttpCode(HttpStatus.FOUND)
  @ApiOperation({
    summary: 'Naver 로그인 페이지로 리다이렉트',
    description: 'Naver 로그인 페이지로 리다이렉트합니다.',
  })
  @ApiResponse({
    status: 302,
    description: 'Naver 로그인 페이지로 리다이렉트합니다.',
  })
  @UseGuards(AuthGuard('naver'))
  async getNaverAuth() {
    return { message: 'Naver 로그인' };
  }

  // 2) Naver 콜백 → 네이버 로그인 성공 시
  @Get('naver/callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Naver 로그인 콜백 처리',
    description:
      'Naver 로그인 이후의 콜백을 처리하고 사용자 정보를 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    description: 'Naver 로그인 성공',
    schema: {
      example: {
        message: 'Naver 소셜로그인에 성공했습니다',
        accessToken: 'jwt-token',
        refreshToken: 'refresh-token',
        deviceId: 'defaultNaverDevice',
        user: {
          email: 'user@example.com',
          nickname: 'admin',
          profileImage: 'http://example.com/profile.jpg',
        },
      },
    },
  })
  @UseGuards(AuthGuard('naver'))
  async getNaverAuthRedirect(
    @OAuthUser()
    user: {
      provider: string;
      providerId: string;
      email: string;
      name: string;
      accessToken: string; // Passport가 넘겨주는 OAuth accessToken (네이버 측)
    },
    @Query('deviceId') deviceId?: string, // ⭐ 쿼리 파라미터로 deviceId 받기
  ) {
    // 1. Passport가 준 user 객체에서 필요한 필드 추출
    const payload = {
      email: user.email,
      nickname: user.name,
      id: user.providerId,
      profileImage: '',
      deviceId: deviceId || 'defaultNaverDevice', // ⭐ deviceId 추가
    };

    // 2. AuthService의 createNaverLogin 호출
    const result = await this.authService.createNaverLogin(payload);

    // 3. 최종 결과 반환
    return result;
  }
}
