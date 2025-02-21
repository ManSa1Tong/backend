import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetDaliyMovieDto {
  @ApiProperty({
    example: '20250221',
    description: '조회하고 싶은 날짜',
  })
  @IsString()
  targetDt: string;

  @ApiProperty({
    example: '10',
    description: '결과 ROW 의 개수를 지정합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  itemPerPage: string;

  @ApiProperty({
    example: 'Y',
    description: '다양성 영화/상업영화를 구분지어 조회할 수 있습니다.',
    required: false,
    enum: ['Y', 'N'],
  })
  @IsString()
  @IsOptional()
  multiMovieYn: string;

  @ApiProperty({
    example: 'K',
    description: '한국/외국 영화별로 조회할 수 있습니다.',
    required: false,
    enum: ['K', 'F'],
  })
  @IsString()
  @IsOptional()
  repNationCd: string;
}
