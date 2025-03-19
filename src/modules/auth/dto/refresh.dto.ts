// 예: refresh.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: '기존에 발급받은 Refresh Token',
  })
  refreshToken: string;

  @ApiProperty({
    example: 'chrome_1234',
    description: '기기를 구분하기 위한 식별자 (멀티 디바이스 지원)',
  })
  deviceId: string;
}
