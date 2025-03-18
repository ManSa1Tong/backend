import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class GetUserInfoDto {
  @ApiProperty({ description: 'user.id', example: 1 })
  id: number;

  @ApiProperty({ description: 'user.email', example: 'ManSa1Tong@mail.com' })
  email: string;

  @ApiProperty({ description: 'user.nickname', example: '김만사' })
  nickname: string;

  @ApiProperty({
    description: 'user.createdAt',
    example: '2025-02-26T07:38:23.508Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'user.authProvider',
    example: 'google',
  })
  authProvider?: string;

  @ApiProperty({
    description: 'user.authProviderId',
    example: '1****************224',
  })
  authProviderId?: string;

  @ApiProperty({
    description: 'user.profileImage',
    example: 'http://www.~~',
  })
  profileImage?: string;

  @Exclude()
  password: string;
}
