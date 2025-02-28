import { ApiProperty } from '@nestjs/swagger';

export class MovieResponseDto {
  @ApiProperty({ example: '20236573', description: '영화 코드' })
  movieCd: string;

  @ApiProperty({ example: '침범', description: '영화 한글 제목' })
  movieNm: string;

  @ApiProperty({ example: 'SOMEBODY', description: '영화 영어 제목' })
  movieNmEn: string;

  @ApiProperty({ example: '2024', description: '제작 연도' })
  prdtYear: string;

  @ApiProperty({ example: '20250312', description: '개봉 예정일' })
  openDt: string;

  @ApiProperty({ example: '미스터리,스릴러', description: '장르' })
  genreAlt: string;

  @ApiProperty({ example: '한국', description: '대표 제작 국가' })
  repNationNm: string;

  @ApiProperty({ example: '미스터리', description: '대표 장르' })
  repGenreNm: string;

  @ApiProperty({
    example: [{ peopleNm: '김여정' }, { peopleNm: '이정찬' }],
    description: '감독 정보',
  })
  directors: { peopleNm: string }[];

  @ApiProperty({
    example: [
      {
        companyCd: '2019641',
        companyNm: '(주)스튜디오 산타클로스엔터테인먼트',
      },
    ],
    description: '제작사 정보',
  })
  companys: { companyCd: string; companyNm: string }[];
}

class NationDto {
  @ApiProperty({ example: '한국', description: '제작 국가' })
  nationNm: string;
}

class GenreDto {
  @ApiProperty({ example: '미스터리', description: '영화 장르' })
  genreNm: string;
}

class DirectorDto {
  @ApiProperty({ example: '이정찬', description: '감독 이름' })
  peopleNm: string;

  @ApiProperty({ example: '', description: '감독 영문 이름' })
  peopleNmEn: string;
}

class ActorDto {
  @ApiProperty({ example: '곽선영', description: '배우 이름' })
  peopleNm: string;

  @ApiProperty({ example: 'KWAK Sun-young', description: '배우 영문 이름' })
  peopleNmEn: string;

  @ApiProperty({ example: '영은', description: '배역' })
  cast: string;

  @ApiProperty({ example: 'LEE Young-eun', description: '배역 영문명' })
  castEn: string;
}

class ShowTypeDto {
  @ApiProperty({ example: '2D', description: '상영 유형 그룹' })
  showTypeGroupNm: string;

  @ApiProperty({ example: '디지털', description: '상영 유형' })
  showTypeNm: string;
}

class CompanyDto {
  @ApiProperty({ example: '2019641', description: '회사 코드' })
  companyCd: string;

  @ApiProperty({
    example: '(주)스튜디오 산타클로스엔터테인먼트',
    description: '회사명',
  })
  companyNm: string;

  @ApiProperty({
    example: 'STUDIO SANTACLAUS ENTERTAINMENT',
    description: '회사 영문명',
  })
  companyNmEn: string;

  @ApiProperty({ example: '제작사', description: '회사 역할' })
  companyPartNm: string;
}

class AuditDto {
  @ApiProperty({ example: '2025-MF00465', description: '심의 번호' })
  auditNo: string;

  @ApiProperty({ example: '15세이상관람가', description: '관람 등급' })
  watchGradeNm: string;
}

class StaffDto {
  @ApiProperty({ example: '정재윤', description: '스태프 이름' })
  peopleNm: string;

  @ApiProperty({ example: '', description: '스태프 영문 이름' })
  peopleNmEn: string;

  @ApiProperty({ example: '투자', description: '스태프 역할' })
  staffRoleNm: string;
}

export class MovieInfoDto {
  @ApiProperty({ example: '20236573', description: '영화 코드' })
  movieCd: string;

  @ApiProperty({ example: '침범', description: '영화명' })
  movieNm: string;

  @ApiProperty({ example: 'SOMEBODY', description: '영화 영문명' })
  movieNmEn: string;

  @ApiProperty({ example: '', description: '영화 원어명' })
  movieNmOg: string;

  @ApiProperty({ example: '112', description: '상영 시간' })
  showTm: string;

  @ApiProperty({ example: '2024', description: '제작 연도' })
  prdtYear: string;

  @ApiProperty({ example: '20250312', description: '개봉일' })
  openDt: string;

  @ApiProperty({ example: '개봉예정', description: '제작 상태' })
  prdtStatNm: string;

  @ApiProperty({ example: '장편', description: '영화 유형' })
  typeNm: string;

  @ApiProperty({ type: [NationDto], description: '제작 국가 리스트' })
  nations: NationDto[];

  @ApiProperty({ type: [GenreDto], description: '영화 장르 리스트' })
  genres: GenreDto[];

  @ApiProperty({ type: [DirectorDto], description: '감독 리스트' })
  directors: DirectorDto[];

  @ApiProperty({ type: [ActorDto], description: '배우 리스트' })
  actors: ActorDto[];

  @ApiProperty({ type: [ShowTypeDto], description: '상영 유형 리스트' })
  showTypes: ShowTypeDto[];

  @ApiProperty({ type: [CompanyDto], description: '참여 회사 리스트' })
  companys: CompanyDto[];

  @ApiProperty({ type: [AuditDto], description: '심의 정보 리스트' })
  audits: AuditDto[];

  @ApiProperty({ type: [StaffDto], description: '스태프 리스트' })
  staffs: StaffDto[];
}

export class GetMovieInfoResponseDto {
  @ApiProperty({ type: MovieInfoDto, description: '영화 정보' })
  movieInfo: MovieInfoDto;

  @ApiProperty({ example: '영화진흥위원회', description: '데이터 출처' })
  source: string;

  @ApiProperty({ example: '', description: '포스터 URL' })
  poster: string;
}

export class GetMovieCodeResponseDto {
  @ApiProperty({ example: '22042099', description: '코드 전체' })
  fullCd: string;

  @ApiProperty({ example: '기타', description: '한국 이름' })
  korNm: string;

  @ApiProperty({ example: 'Other', description: '영어 이름' })
  engNm: string;
}
