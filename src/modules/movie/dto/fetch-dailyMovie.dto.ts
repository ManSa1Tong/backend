import { ApiProperty } from '@nestjs/swagger';

export class GetDaliyMovieDto {
  @ApiProperty({
    example: '20250221',
    description: '조회하고 싶은 날짜',
  })
  targetDt: string;
}
