import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookNotFoundException } from 'src/core/errors/BookNotFoundException';
import { Book } from '../../infra/entities/book.entity';
import { CreateBookDto } from '../dto/createBook';
import { UpdateBookDto } from '../dto/updateBookDto';
import { IBookService } from '../interfaces/book-service.interface';
import { BookRepository } from '../repository/book.repository';

@Injectable()
export class BookService implements IBookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAllBooks();
  }

  async findById(id: number): Promise<Book | null> {
    const found = await this.bookRepository.findBookById(id);

    if (!found) {
      throw new BookNotFoundException(id);
    }

    return found;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.isbn = createBookDto.isbn;

    return this.bookRepository.createBook(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book | null> {
    const book = await this.findById(id);

    if (!book) {
      throw new BookNotFoundException(id);
    }

    book.title = updateBookDto.title || book.title;
    book.author = updateBookDto.author || book.author;
    book.isbn = updateBookDto.isbn || book.isbn;

    return this.bookRepository.updateBook(book);
  }

  async delete(id: number): Promise<void> {
    const result = await this.bookRepository.deleteBook(id);

    if (result.affected === 0) {
      throw new BookNotFoundException(id);
    }
  }
}
