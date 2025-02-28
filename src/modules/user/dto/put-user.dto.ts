import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PutUserDto {
  @ApiProperty({ description: 'user.nickname', example: '김만사' })
  @IsNotEmpty({ message: '닉네임은 반드시 입력해야 합니다.' })
  @IsString({ message: '닉네임은 문자여야 합니다.' })
  nickname: string;
}
