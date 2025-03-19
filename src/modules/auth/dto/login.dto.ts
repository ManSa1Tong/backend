import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'ManSa1Tong@mail.com',
    description: '사용자의 이메일 주소',
  })
  @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
  email: string;

  @ApiProperty({
    example: 'test123!',
    description: '사용자의 비밀번호',
  })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @Length(8, 20, { message: '비밀번호는 8자 이상 20자 이하로 입력해주세요.' })
  password: string;

  @ApiProperty({
    example: 'chrome_1234',
    description: '기기를 구분하기 위한 식별자 (멀티 디바이스 지원)',
  })
  @IsString({ message: 'deviceId는 문자열이어야 합니다.' })
  deviceId: string;
}
