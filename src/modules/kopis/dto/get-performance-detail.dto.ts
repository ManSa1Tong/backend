import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetPerformanceDetailDto {
  @ApiProperty({ description: '조회할 공연 ID', example: 'PF132236' })
  @IsString()
  id: string;
}
