import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetMovieListDto {
  @ApiProperty({
    example: '1',
    description: '현재 페이지를 지정합니다.(default : “1”)',
    required: false,
  })
  @IsString()
  @IsOptional()
  curPage: string;

  @ApiProperty({
    example: '10',
    description: '결과 ROW 의 개수를 지정합니다.(default : “10”)',
    required: false,
  })
  @IsString()
  @IsOptional()
  itemPerPage: string;

  @ApiProperty({
    example: '인셉션',
    description: '영화명으로 조회합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  movieNm: string;

  @ApiProperty({
    example: '크리스토퍼 놀란',
    description: '감독명으로 조회합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  directorNm: string;

  @ApiProperty({
    example: '2025',
    description: 'YYYY형식의 조회시작 개봉연도를 입력합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  openStartDt: string;

  @ApiProperty({
    example: '2025',
    description: 'YYYY형식의 조회종료 개봉연도를 입력합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  openEndDt: string;

  @ApiProperty({
    example: '2025',
    description: 'YYYY형식의 조회시작 제작연도를 입력합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  prdtStartYear: string;

  @ApiProperty({
    example: '2025',
    description: 'YYYY형식의 조회종료 제작연도를 입력합니다.',
    required: false,
  })
  @IsString()
  @IsOptional()
  prdtEndYear: string;

  @ApiProperty({
    example: '22041011',
    description:
      'N개의 국적으로 조회할 수 있으며, 국적코드는 공통코드 조회 서비스에서 “2204” 로서 조회된 국적코드입니다. (default : 전체)',
    required: false,
  })
  @IsString()
  @IsOptional()
  repNationCd: string;

  @ApiProperty({
    example: '220101',
    description:
      'N개의 영화유형코드로 조회할 수 있으며, 영화유형코드는 공통코드 조회 서비스에서 “2201”로서 조회된 영화유형코드입니다. (default: 전체)',
    required: false,
  })
  @IsString()
  @IsOptional()
  movieTypeCd: string;
}

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
    description:
      '다양성 영화/상업영화를 구분지어 조회할 수 있습니다. (defalut:전체)',
    required: false,
    enum: ['Y', 'N'],
  })
  @IsString()
  @IsOptional()
  multiMovieYn: string;

  @ApiProperty({
    example: 'K',
    description: '한국/외국 영화별로 조회할 수 있습니다. (defalut:전체)',
    required: false,
    enum: ['K', 'F'],
  })
  @IsString()
  @IsOptional()
  repNationCd: string;
}

export class GetWeeklyMovieDto {
  @ApiProperty({
    example: '20250221',
    description: '조회하고 싶은 날짜',
  })
  @IsString()
  targetDt: string;

  @ApiProperty({
    example: '0',
    description:
      '주간(월~일)/주말(금~일)/주중(월~목)을 선택 입력합니다. (default:1)',
    required: false,
    enum: ['0', '1', '2'],
  })
  @IsString()
  @IsOptional()
  weekGb: string;

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
    description:
      '다양성 영화/상업영화를 구분지어 조회할 수 있습니다. (defalut:전체)',
    required: false,
    enum: ['Y', 'N'],
  })
  @IsString()
  @IsOptional()
  multiMovieYn: string;

  @ApiProperty({
    example: 'K',
    description: '한국/외국 영화별로 조회할 수 있습니다. (defalut:전체)',
    required: false,
    enum: ['K', 'F'],
  })
  @IsString()
  @IsOptional()
  repNationCd: string;
}
