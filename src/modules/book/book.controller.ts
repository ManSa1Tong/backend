import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getManyBook() {
    return await this.bookService.fetchManyBook();
  }
}
