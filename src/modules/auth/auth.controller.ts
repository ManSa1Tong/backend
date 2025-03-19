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
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/curretUser.decorator';
import { OAuthUser } from 'src/decorators/oauthUser.decorator';
import {
  ApiOperationSummary,
  ApiResponseSuccess,
  ApiResponseCreated,
  ApiResponseError,
} from 'src/decorators/swagger-response.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperationSummary(
    '회원가입',
    '사용자의 이메일, 닉네임, 비밀번호를 통해 회원가입을 처리합니다.',
  )
  @ApiResponseCreated('회원 가입 성공', SignUpDto)
  @ApiResponseError('유효성 검사 실패', 400)
  @ApiResponseError('서버 오류 - 닉네임 중복', 400)
  async postSignUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperationSummary(
    '로그인',
    '이메일과 비밀번호로 로그인하여 JWT를 반환합니다.',
  )
  @ApiResponseSuccess('로그인 성공')
  @ApiResponseError('가입되지 않은 계정', 400)
  @ApiResponseError('잘못된 비밀번호', 400)
  @ApiResponseError('인증에 실패했습니다.', 401)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async postLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperationSummary('로그아웃', '로그아웃을 수행하고 세션을 무효화합니다.')
  @ApiResponseCreated('로그아웃 성공')
  @ApiResponseError('JWT 인증 실패', 401)
  async postLogout(@CurrentUser() userId: number) {
    await this.authService.logout(userId);
    return { message: '로그아웃에 성공했습니다' };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperationSummary(
    '토큰 갱신',
    '리프레시 토큰을 사용해 새로운 액세스 및 리프레시 토큰을 발급받습니다.',
  )
  @ApiBody({ description: '리프레시 토큰 요청 본문', type: RefreshDto })
  @ApiResponseSuccess('새로운 액세스 및 리프레시 토큰 발급 성공')
  @ApiResponseError('유효하지 않거나 만료된 리프레시 토큰', 401)
  async postRefresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refreshTokens(refreshDto);
  }

  @Get('google')
  @HttpCode(HttpStatus.FOUND)
  @ApiOperationSummary(
    'Google 로그인 페이지로 리다이렉트',
    'Google 로그인 페이지로 리다이렉트합니다.',
  )
  @ApiResponseSuccess('Google 로그인 페이지로 리다이렉트합니다.')
  @UseGuards(AuthGuard('google'))
  async getGoogleAuth() {
    return { message: 'Google 로그인' };
  }

  @Get('google/callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperationSummary(
    'Google 로그인 콜백 처리',
    'Google 로그인 이후의 콜백을 처리하고 사용자 정보를 반환합니다.',
  )
  @ApiResponseSuccess('Google 로그인 성공')
  @UseGuards(AuthGuard('google'))
  async getGoogleAuthRedirect(
    @OAuthUser() user,
    @Query('deviceId') deviceId?: string,
  ) {
    const [firstName, lastName] = user.name.split(' ');
    const payload = {
      email: user.email,
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      picture: '',
      sub: user.providerId,
      deviceId: deviceId || 'defaultGoogleDevice',
    };

    return this.authService.createGoogleLogin(payload);
  }

  @Get('naver')
  @HttpCode(HttpStatus.FOUND)
  @ApiOperationSummary(
    'Naver 로그인 페이지로 리다이렉트',
    'Naver 로그인 페이지로 리다이렉트합니다.',
  )
  @ApiResponseSuccess('Naver 로그인 페이지로 리다이렉트합니다.')
  @UseGuards(AuthGuard('naver'))
  async getNaverAuth() {
    return { message: 'Naver 로그인' };
  }

  @Get('naver/callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperationSummary(
    'Naver 로그인 콜백 처리',
    'Naver 로그인 이후의 콜백을 처리하고 사용자 정보를 반환합니다.',
  )
  @ApiResponseSuccess('Naver 로그인 성공')
  @UseGuards(AuthGuard('naver'))
  async getNaverAuthRedirect(
    @OAuthUser() user,
    @Query('deviceId') deviceId?: string,
  ) {
    const payload = {
      email: user.email,
      nickname: user.name,
      id: user.providerId,
      profileImage: '',
      deviceId: deviceId || 'defaultNaverDevice',
    };

    return this.authService.createNaverLogin(payload);
  }
}
