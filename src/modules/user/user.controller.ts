import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/curretUser.decorator';
import { CheckNicknameDto } from './dto/check-nickname.dto';
import { GetUserInfoDto } from './dto/get-user.dto';
import {
  ApiResponseSuccess,
  ApiResponseError,
  ApiOperationSummary,
  ApiResponseCreated,
} from 'src/decorators/swagger-response.decorator';

@ApiTags('user')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('nickname-check')
  @ApiOperationSummary(
    '닉네임 중복 확인',
    '입력한 닉네임이 이미 사용 중인지 확인합니다.',
  )
  @ApiResponseCreated('닉네임 사용 가능')
  @ApiResponseError('닉네임 형식 오류', 400)
  @ApiResponseError('닉네임 중복', 400)
  async postNicknameCheck(@Body() { nickname }: CheckNicknameDto) {
    const isAvailable =
      await this.userService.checkNicknameAvailability(nickname);

    if (!isAvailable) {
      throw new BadRequestException('이미 사용 중인 닉네임입니다.');
    }

    return { message: '사용 가능한 닉네임입니다.' };
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperationSummary('본인 정보 확인', '본인 정보를 확인합니다.')
  @ApiResponseSuccess('본인 정보 확인 성공', GetUserInfoDto)
  @ApiResponseError('인증 토큰이 없을 경우', 401)
  @ApiResponseError('존재하지 않는 회원입니다.', 404)
  @Get('/me')
  async getUser(@CurrentUser() userId: string) {
    return await this.userService.fetchUserByUserId({ userId });
  }
}
