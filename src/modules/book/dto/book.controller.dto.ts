import { ApiProperty } from '@nestjs/swagger';

class AladinBookSeriesDto {
  @ApiProperty({ description: '시리즈 ID', example: 1026831 })
  seriesId: number;

  @ApiProperty({
    description: '시리즈 링크',
    example:
      'http://www.aladin.co.kr/shop/common/wseriesitem.aspx?SRID=1026831&amp;partner=openAPI',
  })
  seriesLink: string;

  @ApiProperty({ description: '시리즈 이름', example: '한글연습 3' })
  seriesName: string;
}

class AladinBookDto {
  @ApiProperty({ description: '책 제목', example: '한글 워크북 한글연습 3' })
  title: string;

  @ApiProperty({
    description: '책 상세 링크',
    example:
      'http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=359010178&amp;partner=openAPI&amp;start=api',
  })
  link: string;

  @ApiProperty({ description: '저자', example: '재미씨 (지은이)' })
  author: string;

  @ApiProperty({ description: '출판일', example: '2025-02-10' })
  pubDate: string;

  @ApiProperty({ description: '설명', example: '' })
  description: string;

  @ApiProperty({ description: 'ISBN', example: 'K212037082' })
  isbn: string;

  @ApiProperty({ description: 'ISBN13', example: '9791199127821' })
  isbn13: string;

  @ApiProperty({ description: '상품 ID', example: 359010178 })
  itemId: number;

  @ApiProperty({ description: '판매 가격', example: 14400 })
  priceSales: number;

  @ApiProperty({ description: '정가', example: 16000 })
  priceStandard: number;

  @ApiProperty({ description: '상품 유형', example: 'BOOK' })
  mallType: string;

  @ApiProperty({
    description: '책 표지 이미지 URL',
    example:
      'https://image.aladin.co.kr/product/35901/1/coversum/k212037082_1.jpg',
  })
  cover: string;

  @ApiProperty({ description: '카테고리 ID', example: 35126 })
  categoryId: number;

  @ApiProperty({
    description: '카테고리 이름',
    example: '국내도서>유아>유아 교양/학습>유아 언어/인지/한글',
  })
  categoryName: string;

  @ApiProperty({ description: '출판사', example: '재미씨' })
  publisher: string;

  @ApiProperty({ description: '성인 도서 여부', example: false })
  adult: boolean;

  @ApiProperty({ description: '고정 가격 여부', example: true })
  fixedPrice: boolean;

  @ApiProperty({ description: '시리즈 정보', type: () => AladinBookSeriesDto })
  seriesInfo: AladinBookSeriesDto;
}

export class AladinBookResponseDto {
  @ApiProperty({ type: [AladinBookDto], description: '국내 도서 목록' })
  domesticBooks: AladinBookDto[];

  @ApiProperty({ type: [AladinBookDto], description: '외국 도서 목록' })
  foreignBooks: AladinBookDto[];

  @ApiProperty({ type: [AladinBookDto], description: 'eBook 목록' })
  ebooks: AladinBookDto[];
}

export class AladinBookDetailDto {
  @ApiProperty({
    description: '도서 제목',
    example: '언더그라운드 레일로드',
  })
  title: string;

  @ApiProperty({
    description: '도서 링크',
    example: 'http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=358998390',
  })
  link: string;

  @ApiProperty({
    description: '저자',
    example: '콜슨 화이트헤드 (지은이), 황근하 (옮긴이)',
  })
  author: string;

  @ApiProperty({
    description: '발행일',
    example: '2017-09-08',
  })
  pubDate: string;

  @ApiProperty({
    description: '도서 설명',
    example:
      '미국 평단과 독자를 독시에 사로잡으며 연일 새로운 기록을 세워온 콜슨 화이트헤드 장편소설.',
  })
  description: string;

  @ApiProperty({
    description: '도서 ISBN',
    example: 'E052635671',
  })
  isbn: string;

  @ApiProperty({
    description: '도서 ISBN-13',
    example: '9791196171742',
  })
  isbn13: string;

  @ApiProperty({
    description: '도서 가격 (판매 가격)',
    example: 14500,
  })
  priceSales: number;

  @ApiProperty({
    description: '도서 가격 (정가)',
    example: 14500,
  })
  priceStandard: number;

  @ApiProperty({
    description: '도서 카테고리',
    example: 'eBook>소설/시/희곡>영미소설',
  })
  categoryName: string;

  @ApiProperty({
    description: '도서 표지 이미지 URL',
    example:
      'https://image.aladin.co.kr/product/35899/83/coversum/e052635671_1.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '출판사',
    example: '은행나무',
  })
  publisher: string;

  @ApiProperty({
    description: '성인 여부',
    example: false,
  })
  adult: boolean;

  @ApiProperty({
    description: '고정 가격 여부',
    example: true,
  })
  fixedPrice: boolean;

  @ApiProperty({
    description: '고객 리뷰 순위',
    example: 8,
  })
  customerReviewRank: number;

  @ApiProperty({
    description: '추가 정보 (종이책 링크 등)',
    type: Object,
  })
  subInfo: Record<string, any>;
}
