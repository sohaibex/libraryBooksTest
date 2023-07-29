import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBookDto } from 'src/book/dto/createBook';
import { UpdateBookDto } from 'src/book/dto/updateBookDto';
import { BookService } from 'src/book/services/book.service';
import { Book } from 'src/infra/entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse({ description: 'Successfully retrieved books', type: [Book] })
  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @ApiOkResponse({ description: 'Successfully retrieved a book', type: Book })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Book> {
    return this.bookService.findById(id);
  }

  @ApiCreatedResponse({
    description: 'Successfully created a book',
    type: Book,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @ApiOkResponse({ description: 'Successfully updated a book', type: Book })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @ApiOkResponse({ description: 'Successfully deleted a book' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.bookService.delete(id);
  }
}
