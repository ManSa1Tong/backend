import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBookDetailDto } from './dto/get-book-detail.dto';
import {
  AladinBookDetailDto,
  AladinBookResponseDto,
} from './dto/book.controller.dto';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @ApiOperation({
    summary: '최신 도서 목록 조회',
    description: '국내/ 외국/ eBook 목록 10개씩 조회',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: AladinBookResponseDto,
  })
  async getManyBook() {
    return await this.bookService.fetchManyBook();
  }

  @Get('/detail')
  @ApiOperation({
    summary: '도서 상세 조회',
    description: 'isbn13코드로 도서 상세 조회',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: AladinBookDetailDto,
  })
  async getBook(@Query() { isbn13 }: GetBookDetailDto) {
    return await this.bookService.fetchBook({ isbn13 });
  }
}
