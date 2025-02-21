import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class GetPerformancesDto {
  @ApiProperty({
    description: '조회 시작 날짜 (YYYYMMDD)',
    example: '20240101',
  })
  @IsString()
  @Length(8, 8)
  startDate: string;

  @ApiProperty({
    description: '조회 종료 날짜 (YYYYMMDD)',
    example: '20240301',
  })
  @IsString()
  @Length(8, 8)
  endDate: string;

  @ApiProperty({
    description: '페이지 번호 (기본값: 1)',
    example: 1,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: '페이지당 결과 개수 (기본값: 10, 최대: 100)',
    example: 10,
    required: false,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  rows?: number = 10;
}
